const prisma = require("../prisma/prismaClient.js");

const getAllBooks = async () => {
    const books = await prisma.book.findMany({
        include: {
            author: true
        }
    });
    return books;
};

const getBookById = async (id) => {
    const book = await prisma.book.findUnique({
        where: { id: parseInt(id) },
        include: {
            author: true
        }
    });
    return book;
};

const createBook = async (title, year, genre, available, authorId) => {
    const book = await prisma.book.create({
        data: {
            title,
            year,
            genre,
            available,
            author: {
                connect: { id: authorId }
            }
        },
        include: {
            author: true
        }
    });
    return book;
};

const updateBook = async (id, data) => {
    const { title, year, genre, available, authorId } = data;

    const updatePayload = {};
    if (title !== undefined) updatePayload.title = title;
    if (year !== undefined) updatePayload.year = year;
    if (genre !== undefined) updatePayload.genre = genre;
    if (available !== undefined) updatePayload.available = available;

    if (authorId !== undefined) {
        updatePayload.author = {
            connect: { id: parseInt(authorId) }
        };
    }

    const book = await prisma.book.update({
        where: { id: parseInt(id) },
        data: updatePayload,
        include: {
            author: true
        }
    });
    return book;
};

const deleteBook = async (id) => {
    const bookExists = await prisma.book.findUnique({ where: { id: parseInt(id) } });
    if (!bookExists) {
        const error = new Error("Livro não encontrado");
        error.code = "NOT_FOUND";
        throw error;
    }

    const book = await prisma.book.delete({
        where: { id: parseInt(id) },
        include: {
            author: true
        }
    });
    return book;
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
