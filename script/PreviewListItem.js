function PreviewListItem(opts) {
    View.apply(this, arguments);
}

$.extend(PreviewListItem.prototype, View.prototype, {
    template:  `<div class='recipe-preview'>
                    <div class='preview-logo'>
                        <img src='<%= imgSrc %>' alt='preview' />
                    </div>
                    <div class='preview-info'>
                        <div class='title'> <%= title %> </div>
                        <div class='publisher'> <%= publisher %> </div>
                    </div>
                </div>`,
                
    imgSrc: null,
    title: null,
    publisher: null,
    id: null,
    previewList: null,

    addEventHandlers() {
        this.$el.click(() => this.previewList.showRecipe(this.id));
        this.$el.find('img').on('error', event => $(event.target).attr('src', './img/imageHolder.svg'));
    },
});
