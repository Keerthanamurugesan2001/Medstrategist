
frappe.listview_settings['Vendors'] = {
	add_fields: ["vendor_name", "location", "status"],
	get_indicator: function(doc) {
		if (doc.status === "Active") {
			return [__("Active"), "green", "status,=,Active"];
		} 
		else if (doc.status === "In Active") {
			return [__("In Active"), "red", "status,=,In Active"];
		} 
    }
}