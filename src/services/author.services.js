const prisma = require("../prisma/prismaClient.js");

const getAllAuthors = async () => {
    const authors = await prisma.author.findMany({
        include: {
            books: true
        }
    });
    return authors;
};

const getAuthorById = async (id) => {
    if (!id) {
        throw new Error("ID is required");
    }

    const author = await prisma.author.findUnique({ 
        where: { id: parseInt(id) },
        include: {
            books: true
        }
    });
    return author;
};

const createAuthor = async (data) => {
    if (!data.name) {
        throw new Error("Name is required");
    }

    const author = await prisma.author.create({
        data: {
            name: data.name,
            nationality: data.nationality,
            birthYear: data.birthYear
        }
    });
    return author;
};

const editAuthorService = async (id, name, nationality, birthYear) => {
    const authorExists = await prisma.author.findUnique({ where: { id }});

    if (!authorExists) {
        throw new Error(`O autor com o id '${id}' não existe.`);
    }

    if (!name && !nationality && !birthYear) {
        throw new Error("Nenhuma informação foi passada para edição.");
    }

    const author = await prisma.author.update({
        where: { id },
        data: {
            name,
            nationality,
            birthYear
        }
    });
    return author;
};

const deleteAuthorService = async (id) => {
    const authorExists = await prisma.author.findUnique({ where: { id }});

    if (!authorExists) {
        throw new Error("Autor não encontrado.");
    }

    await prisma.book.deleteMany({ where: { authorId: id }});
    const author = await prisma.author.delete({ where: { id } });
    return author;
};

const getAuthorBooksService = async (id) => {
    const author = await prisma.author.findUnique({ where: { id } });

    if (!author) {
        throw new Error("O autor fornecido não existe no banco de dados.");
    }

    const books = await prisma.book.findMany({ where: { authorId: id } });
    return books;
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    editAuthorService,
    deleteAuthorService,
    getAuthorBooksService
};