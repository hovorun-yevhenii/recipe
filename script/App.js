function App(opts) {
    View.apply(this, arguments);
}

$.extend(App.prototype, View.prototype, {
    template:
        `<div>
            <div class='header'>
                <div class='logo'><a href='./index.html'></a></div>
                <div class='search-form'></div>
            </div>
            <div class='content'>
                <div class='preview-list'></div>
                <div class='recipe-desc'></div>
                <div class='shopping-list'></div>     
            </div>
        </div>`,


    searchForm: null,
    previewList: null,
    recipeDescription: null,
    shoppingList: null,

    afterRender() {
        this.shoppingList = new ShoppingList({ selector: `${this.selector} .shopping-list` });
        this.recipeDescription = new RecipeDescription({ selector: `${this.selector} .recipe-desc` });
        this.previewList = new PreviewList({ selector: `${this.selector} .preview-list` });
        this.searchForm = new SearchForm({ selector: `${this.selector} .search-form` });

        this.recipeDescription.shoppingList = this.shoppingList;
        this.shoppingList.recipeDescription = this.recipeDescription;
        this.previewList.recipeDescription = this.recipeDescription;
        this.searchForm.previewList = this.previewList;
    }
});



