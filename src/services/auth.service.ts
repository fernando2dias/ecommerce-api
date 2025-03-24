import { FirebaseError } from "firebase/app";
import { EmailAlreadyExistsError } from "../errors/email-already-exists.error";
import { UnauthorizedError } from "../errors/unauthorized.error";
import { User } from "../models/user.model";
import { getAuth, UpdateRequest, UserRecord } from "firebase-admin/auth";
import { getAuth as getFirebaseAuth, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export class AuthService {

    async create(user: User): Promise<UserRecord> {
        return getAuth().createUser({
            email: user.email,
            password: user.password,
            displayName: user.name,
        }).catch(error => {
            if (error.code === "auth/email-already-exists") {
                throw new EmailAlreadyExistsError();
            }
            throw error;
        });
    }

    async update(id: string, user: User){
        const props: UpdateRequest = {
            displayName: user.name,
            email: user.email,
        }

        if(user.password){
            props.password = user.password
        }

        await getAuth().updateUser(id, props);
    }

    async login(email: string, password: string): Promise<UserCredential> {
        return await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
            .catch(error => {
                if (error instanceof FirebaseError) {
                    if (error.code === "auth/invalid-credential") {
                        throw new UnauthorizedError();
                    }
                }
                throw error;
            });
    }

    async delete(id: string):Promise<void>{
        await getAuth().deleteUser(id);
    }

    async recovery(email: string):Promise<void>{
        await sendPasswordResetEmail(getFirebaseAuth(), email);
    }

}