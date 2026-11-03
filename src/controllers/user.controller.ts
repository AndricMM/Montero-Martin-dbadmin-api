import { Request, Response } from 'express';


// GET /api/users
export const getUsers = (req: Request, res: Response) => {
    const user=
    {
        name:"Andric",
        lastname:"Montero",
        email:"[andricmontero@gmail.com]",
        age:20,
        active:true,
        subjects:["Calculo", "Fisica", "Programacion"],

    }
    res.json({
        code: "200_OK",
        data:user
    });
};

export const getUserById=(req: Request, res: Response) => {
    
    

    res.json({
        code: "200_OK",
        data: {
            id: req.params.id,
            name: "Carlos",
            lastname: "Mendoza"
        }
    });
};