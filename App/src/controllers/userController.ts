////////////////////////
/////// IMPORTS ///////
//////////////////////
import { Request, Response } from 'express';
import mssql from 'mssql';
import crypto from 'crypto';
// DEBUGGING | LOGGING
import { log } from 'console';
import { sqlServerConfig } from '../config/config';
import { RequestFormat } from '../../types';

// EXPORT MODULE | GET USER BY ID
export const getUserById = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        const { userId } = req.params;
        // CREATE CONNECTION
        const pool = await mssql.connect(sqlServerConfig);
        let user = (await (await pool.request())
            .input('userId', userId)
            .execute('getUserById')).recordset[0];

        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json(error);
    }
}

// EXPORT MODULE | GET USERS
export const getUsers = async (req: RequestFormat, res: Response) => {
    try {
        // CREATE CONNECTION
        const pool = await mssql.connect(sqlServerConfig);
        let users = await (await pool.request().execute('getUsers')).recordset;
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json(error);
    }
}

// EXPORT MODULE | ADD USER
export const addUser = async (req: RequestFormat, res: Response) => {
    try {
        // CREATE RANDOM UUID FOR USER
        const userId = crypto.randomUUID();
        // GET VALUES FROM REQUEST BODY(The req body does not have a body
        // hence hence the use of RequestFormat to extend the type Request)
        const {
            email,
            userPassword,
            firstName,
            lastName,
            streetAddress,
            city,
            country,
            phone
        } = req.body;
        // CREATE CONNECTION
        const pool = await mssql.connect(sqlServerConfig);
        await pool.request()
            .input('userId', userId)
            .input('email', email)
            .input('userPassword', userPassword)
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('streetAddress', streetAddress)
            .input('city', city)
            .input('country', country)
            .input('phone', phone)
            .execute('addUser')
        res.status(201).json({
            message: 'User added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(error);
    }
}

// EXPORT MODULE | DELETE USER
export const deleteUser = async (req: RequestFormat, res: Response) => {
    try {
        const { userId } = req.params;
        // CREATE CONNECTION
        const pool = await mssql.connect(sqlServerConfig);
        await pool.request()
        .input('userId', userId)
        .execute('deleteUser');
        res.status(200).json({
            message: 'User deleted!'
        });
    } catch (error:any) {
        res.status(500).json(error);
    }
}