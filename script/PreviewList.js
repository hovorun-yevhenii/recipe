function PreviewList(opts) {
    View.apply(this, arguments);
}

$.extend(PreviewList.prototype, View.prototype, {
    template: 
        `<div>
            <div class='pagination'>
                <div class='arrow arrow-left'>prev</div>
                <div class='arrow arrow-right'>next</div>
            </div>
            <div class='notfound'>nothing found</div>
            <div class='loader'>
                <div class='loaderSvg'></div>
            </div>
            <div class='previews'></div>
        </div>`
    ,
// 236bad7848d0105cf41eb4e3e2805bc7 
// 462b1cc8d4f2730081462fbc65136320
    searchUrl: 'http://food2fork.com/api/search?key=236bad7848d0105cf41eb4e3e2805bc7&q=',

    listItems: [],

    query: null,

    RESPONSE_DEF_COUNT: 30,

    currentPage: 1,

    recipeDescription: null,

    addEventHandlers() {
        this.$el.find('.arrow').click(event => this.changePageHandler(event))
    },

    changePageHandler(event) {

        if ( $(event.target).hasClass('arrow-left') ) {
            this.currentPage--;
        } else {
            this.currentPage++;
        }

        this.findRecipes();
    },

    setQuery(query) {
        if (this.query === query) return;

        this.query = query;
        this.currentPage = 1;

        this.findRecipes();
    },

    findRecipes() {
        this.clearList();

        this.fetchRecipes();
    },

    fetchRecipes() {
        this.toggleLoading(true);
            
        return new Promise((res, rej) => {
            $.get(`${this.searchUrl}${this.query}&page=${this.currentPage}`)
                .done(res => {
                    this.renderList( $.parseJSON(res) );
                })
                .fail(rej => {
                    console.table(rej);
                })
                .always(() => {
                    this.toggleLoading(false);
                });
        });
    },

    renderList(response) {

        if (this.currentPage !== 1) {
            this.$el.find('.arrow-left').show();    
        }

        if (response.count === this.RESPONSE_DEF_COUNT) {
            this.$el.find('.arrow-right').show();
        }

        if (response.count === 0) {
            this.$el.find('.notfound').show();
            return;
        }

        $.each(response.recipes, (index, recipe) => {
            this.listItems.push(
                new PreviewListItem({
                    selector: `${this.selector} .previews`,
                    previewList: this,
                    imgSrc: recipe.image_url,
                    title: recipe.title,
                    publisher: recipe.publisher,
                    id: recipe.recipe_id
                })
            )
        })
    },

    clearList() {
        $.each(this.listItems, (index, item) => item.destroy());

        this.listItems = [];

        this.$el.find('.notfound').hide();
        this.$el.find('.arrow-left').hide();
        this.$el.find('.arrow-right').hide();
    },

    toggleLoading(isLoading) {
        this.$el.find('.loader').css('display', isLoading ? 'block' : 'none');
    },

    showRecipe(id) {
        this.recipeDescription.setId(id)
    }
});
