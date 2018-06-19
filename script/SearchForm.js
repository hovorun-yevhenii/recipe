function SearchForm(opts) {
    View.apply(this, arguments);
}

$.extend(SearchForm.prototype, View.prototype, {
    template: 
        `<div>
            <input type='text' maxlength='20' />
            <input type='button' value='search' />
        </div>`
    ,

    query: null,
    ENTER_KEYCODE: 13,

    addEventHandlers() {
        this.$el.find('[type="button"]').click(() => this.submitHandler());
        
        this.$el.find('[type="text"]')
            .on('keypress', key => {
                if (key.which === this.ENTER_KEYCODE) this.submitHandler();   
            })
            .on('input', event => this.query = event.target.value);
    },

    submitHandler() {
        if (this.query) this.previewList.setQuery(this.query);
    }
});
