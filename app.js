const express = require("express");
const app = express();
const tareas = require("./tareas/tareas");

app.use(express.json());

app.get('/tareas',(req,res) => {
    res.json(tareas);
})

app.post('/tareas', (req,res)=>{

    const tareaNueva = {
        codigo: tareas.length + 1,
        tarea: req.body.tarea,
        descripcion: req.body.descripcion
    }

    tareas.push(tareaNueva);

    res.status(201).json(tareaNueva);

});

const tareaRegistrada = (req,res,next) => {

    const codigo = parseInt(req.params.codigo);

    const existe = tareas.find(t => t.codigo === codigo);
    

    if(!existe){
        return res.status(409).json({
            error: "El codigo no existe"
        });
    }

    next();
}

app.put('/tareas/:codigo', tareaRegistrada, (req,res) => {
    const codigo = parseInt(req.params.codigo)
    const posicionTarea = tareas.findIndex(t => t.codigo === codigo);

    const nuevoUsuario = {
        codigo: req.body.codigo,
        tarea: req.body.tarea,
        descripcion: req.body.descripcion
    }

    tareas[posicionTarea]  = nuevoUsuario; 


    res.json(nuevoUsuario);

})

app.listen(3000,()=>{
    console.log('Servidor en funcionamiento')
})
