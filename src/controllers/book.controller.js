const bookService = require('../services/book.service');
const authorService = require('../services/author.services');

const getAll = async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        if (!books || books.length === 0) {
            return res.status(404).json({ message: "Nenhum livro encontrado." });
        }
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await bookService.getBookById(id);
        if (!book) {
            return res.status(404).json({ message: "Livro não encontrado." });
        }
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar livro", error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { title, year, genre, available, authorId } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: "Título é obrigatório" });
        }
        
        if (!year || isNaN(year)) {
            return res.status(400).json({ message: "Ano válido é obrigatório" });
        }
        
        if (!genre) {
            return res.status(400).json({ message: "Gênero é obrigatório" });
        }
        
        if (!authorId || isNaN(authorId)) {
            return res.status(400).json({ message: "ID de autor válido é obrigatório" });
        }

        // Verificar se o autor existe
        const authorExists = await authorService.getAuthorById(authorId);
        if (!authorExists) {
            return res.status(404).json({ message: "Autor não encontrado" });
        }

        const newBook = await bookService.createBook(title, year, genre, available, authorId);
        return res.status(201).json({ message: "Livro criado com sucesso", book: newBook });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao criar livro", error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await bookService.updateBook(parseInt(id), req.body);
        return res.status(200).json({ message: "Livro atualizado com sucesso", book: updatedBook });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao atualizar livro", error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await bookService.deleteBook(parseInt(id));
        return res.status(200).json({ message: "Livro removido com sucesso" });
    } catch (error) {
        if (error.code === "NOT_FOUND" || error.message.includes("não encontrado")) {
            return res.status(404).json({ message: "Livro não encontrado" });
        }
        return res.status(400).json({ message: "Erro ao deletar livro", error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};