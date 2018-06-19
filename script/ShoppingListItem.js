function ShoppingListItem(opts) {
    View.apply(this, arguments);
}

$.extend(ShoppingListItem.prototype, View.prototype, {
    template: `
            <div class='dish' id='<%= recipe.recipe_id %>'>
                <div class='heading'>
                    <div class='title'><%= recipe.title %></div>
                    <div class='delete-recipe'></div>
                </div>
                <div class='ingredients'>
                    <% $.each(recipe.ingredients, (index, ingredient) => { %>
                            <div class='ingredient'>
                                <div class='ingredient-title'><%= ingredient %></div>
                                <div class='delete-ingredient'></div>
                            </div>
                    <% }) %>
                </div>
            </div>`,

    recipe: null,

    addEventHandlers() {
        this.$el.find('.delete-recipe').click(event => this.$el.trigger('delRecipe'));
        this.$el.find('.delete-ingredient').click(event => $(event.target).trigger('delIngredient'));
        this.$el.find('.title').click(event => this.$el.trigger('showRecipe'));
    }
});
