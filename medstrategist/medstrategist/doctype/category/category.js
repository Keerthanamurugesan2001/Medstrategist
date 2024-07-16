// Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Category", {
	refresh(frm) {
        frm.add_custom_button(__('Order Sample'), function(){
            //perform desired action such as routing to new form or fetching etc.
          }, __('OrderSample'));
	},
});
