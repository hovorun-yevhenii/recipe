function ShoppingList(opts) {
    View.apply(this, arguments);
}

$.extend(ShoppingList.prototype, View.prototype, {
    template: 
        `<div>
            <div class='shoppinglist-heading'>shopping list</div>
            <div class='shopping-items'></div>
        </div>`,

    recipeDescription: null,
    shoppingItems: [],
    buys: [],
   
    addEventHandlers() {
        this.$el.on('delRecipe', event => {
            const recipeIndex = $(event.target).closest('.dish').parent().index();

            this.removeRecipe(recipeIndex);
        });

        this.$el.on('delIngredient', event => {
            const $target =  $(event.target),
                  recipeIndex = $target.closest('.dish').parent().index(),
                  ingredientIndex = $target.parent().index();

            this.removeIngredient(recipeIndex, ingredientIndex);
        });

        this.$el.on('showRecipe', event => {
            const recipeId = $(event.target).closest('.dish').attr('id');

            this.recipeDescription.setId(recipeId);
        });
    },

    afterRender() {
        this.buys = JSON.parse(localStorage.getItem(`buysListArray`)) || [];
        this.shoppingItems = [];

        $.each(this.buys, (index, buy) => {
            this.shoppingItems.push(
                new ShoppingListItem({
                    selector: `${this.selector} .shopping-items`,
                    recipe: buy
                })
            )
        });

        View.prototype.afterRender.apply(this, arguments);
    },

    removeRecipe(recipeIndex) {
        this.buys.splice(recipeIndex, 1);

        this.shoppingItems[recipeIndex].destroy();

        this.shoppingItems.splice(recipeIndex, 1);

        localStorage.setItem(`buysListArray`, JSON.stringify(this.buys));
    },

    removeIngredient(recipeIndex, ingredientIndex) {
        const ingredients = this.buys[recipeIndex].ingredients,
              shoppingItem = this.shoppingItems[recipeIndex];

        ingredients.splice(ingredientIndex, 1);

        localStorage.setItem(`buysListArray`, JSON.stringify(this.buys));

        if (!ingredients.length) {
            this.removeRecipe(recipeIndex)
        } else {
            shoppingItem.recipe.ingredients = ingredients;
            shoppingItem.update();
        }
    },

    addRecipe(recipe) {
        let isRecipeAlreadyExist = false;

        $.each(this.buys, (index, buy) => {
            if (buy.recipe_id === recipe.recipe_id) {
                isRecipeAlreadyExist = true;
                buy.ingredients = recipe.ingredients;
            }
        });

        if (!isRecipeAlreadyExist) {
            this.buys.push(recipe);

            this.shoppingItems.push(
                new ShoppingListItem({
                    selector: `${this.selector} .shopping-items`,
                    recipe: recipe
                })
            );

            localStorage.setItem(`buysListArray`, JSON.stringify(this.buys));
        }
    },

    update() {
        localStorage.setItem(`buysListArray`, JSON.stringify(this.buys));
        View.prototype.update.apply(this, arguments);
    }
});
