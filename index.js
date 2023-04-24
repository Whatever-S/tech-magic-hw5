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
const _apiBase = 'https://jsonplaceholder.typicode.com/posts';
const postList = document.querySelector('.post__list'), addButton = document.querySelector('.button__add');
let response = null;
let startPoint = 0, dataLoaded = false;
function getInfo(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error(`Error fetching data: ${error}`);
            throw error;
        }
    });
}
function renderPosts(start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        let posts = response === null || response === void 0 ? void 0 : response.slice(start, end);
        posts === null || posts === void 0 ? void 0 : posts.forEach((post) => {
            const postNode = document.createElement("li");
            postNode.className = "post";
            postNode.innerHTML = `
            <h2>User ${post.id}, ${post.title}</h2>
            <p>${post.body}</p>
        `;
            postList.appendChild(postNode);
        });
    });
}
function getInfoOnLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dataLoaded) {
            response = yield getInfo(_apiBase);
            dataLoaded = true;
        }
    });
}
window.addEventListener('load', () => __awaiter(void 0, void 0, void 0, function* () {
    yield getInfoOnLoad();
    yield renderPosts(startPoint, startPoint + 10);
}));
addButton.addEventListener('click', () => {
    if (startPoint === 30) {
        addButton.classList.add('disable');
    }
    startPoint += 10;
    renderPosts(startPoint, startPoint + 10);
});
