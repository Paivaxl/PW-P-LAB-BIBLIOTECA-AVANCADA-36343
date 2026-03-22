const authorService = require('../services/author.services');

const getAll = async (req, res) => {
    try {
        const authors = await authorService.getAllAuthors();
        
    
        if (!authors || authors.length === 0) {
            return res.status(404).json({ message: "Nenhum autor encontrado." });
        }

        return res.status(200).json(authors);
    } catch (error) {
        console.error("Erro ao obter todos autores:", error);
        return res.status(500).json({ message: "Erro interno do servidor", error: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await authorService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({ message: "Autor não encontrado." });
        }

        return res.status(200).json(author);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar autor", error: error.message });
    }
};

const create = async (req, res) => {
    try {
        const { name, nationality, birthYear } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: "Nome é obrigatório" });
        }
        
        if (!nationality) {
            return res.status(400).json({ message: "Nacionalidade é obrigatória" });
        }
        
        if (!birthYear || isNaN(birthYear)) {
            return res.status(400).json({ message: "Ano de nascimento válido é obrigatório" });
        }

        const newAuthor = await authorService.createAuthor(req.body);
        return res.status(201).json({ message: "Autor criado com sucesso", author: newAuthor });
    } catch (error) {
        return res.status(400).json({ message: "Erro ao criar autor", error: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, nationality, birthYear } = req.body;

        if (!name && !nationality && !birthYear) {
            return res.status(400).json({ message: "Pelo menos um campo deve ser informado para atualizar" });
        }

        const updatedAuthor = await authorService.editAuthorService(parseInt(id), name, nationality, birthYear);
        return res.status(200).json({ message: "Autor atualizado com sucesso", author: updatedAuthor });
    } catch (error) {
        if (error.message.includes("não existe") || error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: "Erro ao atualizar autor", error: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        await authorService.deleteAuthorService(parseInt(id));
        return res.status(200).json({ message: "Autor removido com sucesso" });
    } catch (error) {
        if (error.message.includes("não encontrado") || error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: "Erro ao deletar autor", error: error.message });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};