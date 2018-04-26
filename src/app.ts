import IUser from './models/user';

import * as $ from 'jquery';

let users: Array<IUser> = [];

const containerDiv: JQuery<HTMLElement> = $('#container');
const searchInput: JQuery<HTMLElement> = $('#myfilter');
containerDiv.html('<h1>Hello</h1>');

const renderList = (users: Array<IUser>) => {
    containerDiv.html('');
    const tableEl : JQuery<HTMLElement> = $('<table/>');
    const headerTr : JQuery<HTMLElement> =  $('<tr><th>id</th><th>Login</th></tr>');
    tableEl.append(headerTr);
    users.forEach((user: IUser) => {
        const trItem: JQuery<HTMLElement> = $(`<tr><td>${user.id}</td><td>${user.login}</td></tr>`);
        tableEl.append(trItem);
    });
    containerDiv.append(tableEl);
};



searchInput.on('keyup', () => {
    const query: string = searchInput.val() as string;
    const filteredUsers = users
                            .filter((user: IUser) => user.login.indexOf(query) > -1);
    renderList(filteredUsers);

});

const userPromise: JQueryXHR = $.get('https://api.github.com/users');
userPromise.then((res: Array<IUser>) => {
    users = res;
    renderList(users);
}, () => {
    console.log('errr');
});


