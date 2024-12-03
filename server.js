const express = require('express');
const { sequelize, User } = require('./index'); 

const app = express();
const PORT = 3000;

app.use(express.json());


app.get('/users', async (request, response) => {
    try {
        const users = await User.findAll();
        response.json(users);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
});

// Crear usuario
app.post('/users', async (request, response) => {
    const { name, email, age } = request.body;
    if (!name || !email || !age) {
        return response.status(400).json({ message: 'Todos los campos son requeridos: name, email, age' })
        };

    try {
        const user = await User.create({ name, email, age });
        response.status(201).json(user);
    } catch (error) {
        console.error('Error creando usuario:', error);
        response.status(500).send('Error en el servidor');
    }
});

// Actualizar usuario
app.put('/users/:id', async (request, response) => {
    const { id } = request.params;
    const { name, email, age } = request.body;
    try {
        const [updated] = await User.update({ name, email, age }, { where: { id } });
        if (updated) {
            //response.send('Usuario actualizado correctamente');
            response.status(201).json({ message: 'Usuario actualizado correctamente' });

        } else {
            response.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        response.status(500).json({ message: 'Error en el servidor' });
    }
});

// Eliminar usuario
app.delete('/users/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            response.send('Usuario eliminado correctamente');
        } else {
            response.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        response.status(500).json({ message: 'Error en el servidor' });

    }
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


