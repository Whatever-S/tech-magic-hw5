var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import updateObjectInArray from "./updateObjectInArray.js";
const _apiBase = 'https://jsonplaceholder.typicode.com/posts';
const postList = document.querySelector('.post__list'), addButton = document.querySelector('.button__add'), testButton = document.querySelector('.button__test');
let response, startPoint = 0, dataLoaded = false;
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
        let posts = response.slice(start, end);
        posts.forEach((post) => {
            const { id, body, title } = post;
            const postNode = document.createElement("li");
            postNode.className = "post";
            postNode.innerHTML = `
            <h2>User ${id}, ${title}</h2>
            <p>${body}</p>
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
    yield renderPosts(startPoint, startPoint += 10);
}));
addButton.addEventListener('click', () => {
    if (startPoint === 90) {
        addButton.classList.add('disable');
    }
    renderPosts(startPoint, startPoint += 10);
});
testButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const update = {
        title: 'The test is successful!',
        body: 'Function "updateObjectInArray" works correctly!',
    };
    const updatedArray = yield updateObjectInArray(response, 'id', response[0].id, update);
    if (updatedArray !== null) {
        response = updatedArray;
        postList.innerHTML = '';
        renderPosts(0, startPoint);
        let firstChild = postList.children[0];
        firstChild.classList.add('green');
        window.scrollTo(0, 0);
        testButton.classList.add('disable');
    }
}));
