
frappe.views.Workspace = class CustomWorkspace extends frappe.views.Workspace {
    constructor(wrapper) {
        super(wrapper);
    }

    sidebar_item_container(item) {
        let customIcon = item.custom_external_icon_image;
        item.indicator_color = item.indicator_color || this.indicator_colors[Math.floor(Math.random() * 12)];
        let labelStyle = customIcon ? 'style="margin: 0 10px;"' : '';

        return $(`
        <div
            class="sidebar-item-container ${item.is_editable ? "is-draggable" : ""}"
            item-parent="${item.parent_page}"
            item-name="${item.title}"
            item-public="${item.public || 0}"
            item-is-hidden="${item.is_hidden || 0}"
        >
            <div class="desk-sidebar-item standard-sidebar-item ${item.selected ? "selected" : ""}">
                <a
                    href="/app/${item.public
                ? frappe.router.slug(item.title)
                : "private/" + frappe.router.slug(item.title)
            }"
                    class="item-anchor ${item.is_editable ? "" : "block-click"}" title="${__(item.title)}"
                >
                    <span class="sidebar-item-icon" item-icon=${item.icon}>
                        ${customIcon
                ? `<div class="icon icon-md" aria-hidden="true"><div class="inner-icon"><img src="${customIcon}" alt="Icon"/></div></div>`
                : item.public
                    ? frappe.utils.icon(item.icon, "md")
                    : `<span class="indicator ${item.indicator_color}" ></span>`
            }
                    </span>
                    <span class="sidebar-item-label" ${labelStyle}>
                    ${__(item.title)}<span>
                </a>
                <div class="sidebar-item-control"></div>
            </div>
            <div class="sidebar-child-item nested-container"></div>
        </div>
    `);

    }   
}
