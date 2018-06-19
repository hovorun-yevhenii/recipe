function View(opts) {
    $.extend(this, opts);

    this.tpl = _.template(this.template);
    this.$container = $(`<${this.tag}>`).appendTo(this.selector);

    this.render();
}

$.extend(View.prototype, {
    selector: 'body',

    tag: 'div',

    template: '<div></div>',

    $el: null,

    beforeRender() {

    },

    render() {
        this.beforeRender();

        this.$container.html('');
        this.$el = $(this.tpl(this)).appendTo(this.$container);

        this.afterRender();
        this.addEventHandlers();
    },

    update() {
        this.unbindAll(this.$container);

        this.render();
    },

    afterRender() {
        
    },

    addEventHandlers() {
        
    },

    unbindAll($el) {
        $el.unbind();
        $el.children().each((index, elem) => {
            this.unbindAll($(elem));
        });
    },

    destroy() {
        this.unbindAll(this.$el);
        this.$container.remove();
    }
});
