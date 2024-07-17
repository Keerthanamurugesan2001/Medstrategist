import frappe
from frappe import _
from frappe.desk.desktop import Workspace


@frappe.whitelist()
def get_workspace_sidebar_items():
	"""Get list of sidebar items for desk"""
	has_access = "Workspace Manager" in frappe.get_roles()

	# don't get domain restricted pages
	blocked_modules = frappe.get_cached_doc("User", frappe.session.user).get_blocked_modules()
	blocked_modules.append("Dummy Module")

	# adding None to allowed_domains to include pages without domain restriction
	allowed_domains = [None, *frappe.get_active_domains()]

	filters = {
		"restrict_to_domain": ["in", allowed_domains],
		"module": ["not in", blocked_modules],
	}

	if has_access:
		filters = []

	# pages sorted based on sequence id
	order_by = "sequence_id asc"
	fields = [
		"name",
		"title",
		"custom_external_icon_image",
		"for_user",
		"parent_page",
		"content",
		"public",
		"module",
		"icon",
		"indicator_color",
		"is_hidden",
	]
	all_pages = frappe.get_all(
		"Workspace", fields=fields, filters=filters, order_by=order_by, ignore_permissions=True
	)
	pages = []
	private_pages = []

	# Filter Page based on Permission
	for page in all_pages:
		try:
			workspace = Workspace(page, True)
			if has_access or workspace.is_permitted():
				if page.public and (has_access or not page.is_hidden) and page.title != "Welcome Workspace":
					pages.append(page)
				elif page.for_user == frappe.session.user:
					private_pages.append(page)
				page["label"] = _(page.get("name"))
		except frappe.PermissionError:
			pass
	if private_pages:
		pages.extend(private_pages)

	if len(pages) == 0:
		pages = [frappe.get_doc("Workspace", "Welcome Workspace").as_dict()]
		pages[0]["label"] = _("Welcome Workspace")

	return {
		"pages": pages,
		"has_access": has_access,
		"has_create_access": frappe.has_permission(doctype="Workspace", ptype="create"),
	}

@frappe.whitelist()
def custom_fetch(docname):
	emp = frappe.get_doc('Employee', docname)

	val = ["type_of_employment", "educational_qualification", "experience", "area_of_expertise",
  	"skill_set",  "responsibility"]
	for d in val:
		emp.custom_skill.append(
			{"skill_set": d}
		)
	
	# emp.custom_skill,append([["type_of_employment", "", "", ...], 
	# 	["educational_qualification", "", "", ...], 
	# 	["experience", "", "", ...], 
	# 	["area_of_expertise", "", "", ...], 
	# 	["skill_set", "", "", ...], 
	# 	["responsibility", "", "", ...]])
	
	# is a list
	# in which i want to add skill set - coloumn NameError
	# ["type_of_employment", 
	# 	"educational_qualification", 
	# 	"experience", 
	# 	"area_of_expertise", 
	# 	"skill_set", 
	# 	"responsibility"] in row of all first ccolumn

	# docname.append("skill_set", {
	# 	"type_of_employment": "Full-time", 
	# 	"educational_qualification": "Bachelor's Degree", 
	# 	"experience": "5 years", 
	# 	"area_of_expertise": "Software Development", 
	# 	"skill_set": "Python, JavaScript", 
	# 	"responsibility": "Developing and maintaining applications" 
	# })

	

	# emp.custom_skill.append("skill_set", {
	# 	"type_of_employment": "Part-time", 
	# 	"educational_qualification": "Master's Degree", 
	# 	"experience": "3 years", 
	# 	"area_of_expertise": "Project Management", 
	# 	"skill_set": "Agile, Scrum", 
	# 	"responsibility": "Managing projects and teams" 
	# })