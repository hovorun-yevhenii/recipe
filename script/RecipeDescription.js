function RecipeDescription(opts) {
    View.apply(this, arguments);
}

$.extend(RecipeDescription.prototype, View.prototype, {
    template:
        `<div>
            <div class='loader'>
                <div class='loaderSvg'></div>
            </div>
            <% if (recipe) { %>
                <img src='<%= recipe.image_url %>' alt='recipe_title' />
                <div class='title'><%= recipe.title %></div>
                <div class='addButton'>add to shopping list</div>
                <div class='ingredients'>
                    <% $.each(recipe.ingredients, (index, ingredient) => { %>
                        <span><%= ingredient %></span>
                    <% }); %>  
                </div>
            <% } %>
        </div>`,

    getUrl: 'http://food2fork.com/api/get?key=236bad7848d0105cf41eb4e3e2805bc7&rId=',

    recipe: null,
    recipeId: null,
    isLoading: false,
    shoppingList: null,

    addEventHandlers() {
        this.$el.find('.addButton').click(event => this.addBtnHandler(event));

        this.$el.find('img').on('error', event => $(event.target).attr('src', './img/imageHolder.svg'));
    },

    setId(recipeId) {
        if (this.isLoading || this.recipeId === recipeId) return;

        this.recipeId = recipeId;

        this.fetchRecipe();
    },

    fetchRecipe() {
        this.toggleLoading(true);
            
        return new Promise((res, rej) => {
            $.get(`${this.getUrl}${this.recipeId}`)
                .done(res => {
                    this.recipe = $.parseJSON(res).recipe;
                    this.update();
                    this.toggleLoading(false);
                })
                .fail(rej => {
                    console.table(rej);
                    this.toggleLoading(false);
                });
        });
    },

    toggleLoading(isLoading) {
        this.isLoading = isLoading;

        this.$el.find('.loader').css('display', isLoading ? 'block' : 'none');
    },

    addBtnHandler(event) {
        const clonedRecipe = $.extend(true, {}, this.recipe);

        this.shoppingList.addRecipe(clonedRecipe)
    }
});
