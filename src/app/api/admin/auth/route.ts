import { connectDb } from "@/config/connectDB";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    await connectDb();

    const body = await req.json();

    const { type } = body;

    if (type === 'create') {
        const { name, email, password, type } = body;

        try {
            const hashed = await bcrypt.hash(password, 10);

            const newUser = new User({
                name, email, password: hashed
            });

            await newUser.save();

            return NextResponse.json({
                message: 'User registered'
            }, { status: 200 });
        } catch (error) {
            return NextResponse.json({
                message: 'Something went wrong'
            }, { status: 400 });
        }
    }

    if (type === 'login') {
        try {

            const { email, password } = body;

            const found = await User.findOne({ email });
            if (!found) {
                return NextResponse.json({
                    message: 'User not found'
                }, { status: 404 });
            }

            const matched = await bcrypt.compare(found.password, password);

            if (!matched) {
                return NextResponse.json({
                    message: 'Invalid password'
                }, { status: 403 });
            }

            const token = jwt.sign({ email: found.email }, process.env.SECRET_KEY as string, { expiresIn: '86400' })

            const res = NextResponse.json({
                status: 201,
                success: true
            });

            res.cookies.set('token', token, {
                sameSite: 'strict',
                httpOnly: true,
                secure: true,
                maxAge: 86400
            });

            return res;


        } catch (error) {
            return NextResponse.json({
                message: 'Something went wrong'
            }, { status: 400 });
        }
    }

}