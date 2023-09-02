class CommentStorage {
  #comments;
  #updateLocalStorage;

  constructor(comments = [], updateLocalStorage) {
    this.#comments = comments;
    this.#updateLocalStorage = updateLocalStorage;
  }

  add(comment) {
    this.#comments.push(comment);
    this.#updateLocalStorage(this.#comments);
  }

  getComments() {
    return [...this.#comments];
  }
}

module.exports = {
  CommentStorage,
};
