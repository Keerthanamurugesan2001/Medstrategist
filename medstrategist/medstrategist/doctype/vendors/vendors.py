# Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Vendors(Document):
	@frappe.whitelist()
	def get_category(self):
		categories = frappe.db.get_all('Category', 
			filters={
				'reference_name': self.name,
				'reference_doctype': 'Vendors'
			},
			fields=['name', 'lead_time_per_product']
		)
		if not categories:
			categories = []
		return frappe.render_template('templates/vendor/category.html', {'categories': categories})

