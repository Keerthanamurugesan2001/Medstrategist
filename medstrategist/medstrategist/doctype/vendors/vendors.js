// Copyright (c) 2024, keerthana.murugesan@softsuave.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Vendors", {
    refresh(frm) {
        update_html_content(frm);
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
    frappe.db.get_list('Category', {
        filters: {
            reference_name: frm.doc.reference_name,
            reference_doctype: frm.doc.reference_doctype
        },
        fields: ['name', 'lead_time_per_product']
    }).then(categories => {
        let html_content = '<style>\
                .category-body {\
                    display: grid;\
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\
                    gap: 10px;\
                }\
                .category-card {\
                        border: 1px solid #ddd;\
                        border-radius: 12px;\
                        padding: 16px;\
                        margin: 10px 0;\
                        background-color: #f7f9f9;\
                }\
                .category-card h3 {\
                    margin-top: 0;\
                    color: #333;\
                }\
                .category-card p {\
                    margin: 5px 0;\
                }\
                .category-card a {\
                    text-decoration: none;\
                    color: #007bff;\
                }\
                .category-card a:hover {\
                    text-decoration: underline;\
                }\
            </style>\
            <div class="category-body">';
        categories.forEach(category => {
            
            html_content += `
                <div class='category-card'>
                    <h4>Part Category Id: <a href="/app/category/${category.name}">${category.name}</a></h4>
                    <p>Lead Time Per Product: ${category.lead_time_per_product}</p>
                </div>
            `;
        });
        html_content += '</div>'
        frm.fields_dict.categories.$wrapper.html(html_content);
    });
} 
