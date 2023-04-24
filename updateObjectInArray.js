"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function updateObjectInArray(initialArray, key, value, patch) {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a copy of the initial array
        const newArray = [...initialArray];
        // Find the index of the object to update
        const index = newArray.findIndex((obj) => obj[key] === value);
        // If the object is found, update it with the patch
        if (index !== -1) {
            newArray[index] = Object.assign(Object.assign({}, newArray[index]), patch);
        }
        // Return the updated array
        return newArray;
    });
}
