"use client"

import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"; 
import { ThreadValidation } from "@/lib/validations/thread";
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import Image from "next/image";

import { fetchUser, updateUser } from "@/lib/actions/user.actions";
import { createThread } from "@/lib/actions/thread.actions";



interface Props {
    userId: string;
}

function PostThread({userId} : Props) {

    const router = useRouter();
    const pathname = usePathname();
 
    const form = useForm({

        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: " ",
            accountid: userId,
        }
    });


    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname
        });

        router.push("/");
    }


    return  (
        <Form {...form}>
           <form
                className='mt-10 flex flex-col justify-start gap-10'
                onSubmit={form.handleSubmit(onSubmit)}
            >

                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col  gap-3 w-full">
                        <FormLabel className="text-base-semibold text-light-2 ">
                            Content
                        </FormLabel>
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Textarea 
                                rows={15}

                                {...field}
                                
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" className="bg-primary-500">
                        Post Thread
            </Button>

            </form>
        </Form>
    )
}

export default PostThread;