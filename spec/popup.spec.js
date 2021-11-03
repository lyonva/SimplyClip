describe("'Save File' button saves the current clipboard", function () {
    createButtonListeners();

    it("The event listener for the save file button gets added", function () {
        listnerAdded = document.getElementById("savebutton").getAttribute('listener');

        expect(listnerAdded).toBe(true);
    })
})
