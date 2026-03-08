const express = require("express");
const app = express();
const tareas = require("./tareas/tareas");

app.use(express.json());

app.get('/tareas',(req,res) => {
    res.json(tareas);
})

const tareaRegistrada = (req,res,next) => {

    const codigo = parseInt(req.body.codigo);

    const existe = tareas.find(t => t.codigo === codigo);

    if(existe){
        return res.status(409).json({
            error: "Ese código ya existe"
        });
    }

    next();
}

app.post('/tareas', tareaRegistrada, (req,res)=>{

    const tareaNueva = {
        codigo: tareas.length + 1,
        tarea: req.body.tarea,
        descripcion: req.body.descripcion
    }

    tareas.push(tareaNueva);

    res.status(201).json(tareaNueva);

});

app.listen(3000,()=>{
    console.log('Servidor en funcionamiento')
})
