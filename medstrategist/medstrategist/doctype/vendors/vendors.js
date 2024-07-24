// Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Vendors", {
    refresh(frm) {
        update_html_content(frm);
        update_add_category(frm);
        if(frm.is_new()) {
            frm.page.set_title('Add Vendors');
        }
    },
    add_category(frm) {
        let doctype_name = frm.doc.doctype;
        let doc_name = frm.doc.name;

        frappe.model.with_doctype('Category', () => {
            let category_doc = frappe.model.get_new_doc('Category');
            category_doc.reference_doctype = doctype_name;
            category_doc.reference_name = doc_name;

            frappe.set_route('Form', 'Category', category_doc.name);
        });
    }
});

function update_html_content(frm) {

    frappe.call({
        method: 'get_category',
        doc: frm.doc,
        callback: function(r) {
            frm.fields_dict.categories.$wrapper.html(r.message);
        }
    })
}

function update_add_category(frm) {
    if (frm.fields_dict.add_category) {
        frm.fields_dict.add_category.$wrapper.wrap('<div class="add-category-container"></div>');

        $('.add-category-container').css({
            'text-align': 'right',
            'margin-bottom': '15px'
        });
    }
}

