import z from "zod";
import { validateForEmptySpaces } from "./utils";


const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const AcceptedFileTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;

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


