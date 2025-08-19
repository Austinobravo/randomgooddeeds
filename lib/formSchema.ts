import z from "zod";
import { validateForEmptySpaces } from "./utils";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const AcceptedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
export const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{6,}$/

export const LoginFormSchema = z.object({
   username_or_email: z
      .string()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   password: z
      .string()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
});

export const RegisterFormSchema = z.object({
   firstName: z
      .string()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   lastName: z
      .string()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   username: z
      .string()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   referralCode: z
      .string()
      .optional()
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value || !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   email: z
      .email()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   password: z
      .string()
      .min(6, { message: "This field must have at least six characters" })
      .regex(passwordRegex,{ message: "Password must include uppercase, lowercase, number, and special character"})
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
   confirmPassword: z
      .string()
      .min(6, { message: "This field must have at least six characters" })
      .regex(passwordRegex,{ message: "Password must include uppercase, lowercase, number, and special character"})
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
}).refine((data) => data.password !== data.confirmPassword, {message: "Password don't match.", path: ["confirmPassword"]});

export const ForgotPasswordFormSchema = z.object({
   email: z
      .email()
      .min(1, { message: "This field is mandatory" })
      .refine((value) => !value || validateForEmptySpaces(value), { message: "No empty spaces" })
      .refine((value) => !value.match(emojiRegex), { message: "No emoji's alllowed." }),
});

 export const ResetForgotPasswordSchema = z.object({
    newPassword: z.string().min(1, {message: "This field is mandatory"}).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{6,}$/,
    {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    }
  ).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
    confirmNewPassword: z.string().min(1, {message: "This field is mandatory"}).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._\-])[A-Za-z\d@$!%*?&._\-]{6,}$/,
    {
      message:
        "Password must include uppercase, lowercase, number, and special character",
    }
  ).refine((value) => !value || validateForEmptySpaces(value), {message: "No empty spaces"}).refine((value) => !value.match(emojiRegex), {message: "No emoji's alllowed."}),
  }).refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {message: "Passwords don't match", path: ["confirmNewPassword"]})
  
