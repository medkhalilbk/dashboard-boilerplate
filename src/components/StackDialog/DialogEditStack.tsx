import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Image from "next/image";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import { updateStack } from "@/lib/features/stackSlice";
import { editStackAction } from "@/lib/actions/stacks";
import { toast } from "sonner";
export default function DialogEditStack({id,stackNameProps, stackUrlProps}: {id:string,stackNameProps: string, stackUrlProps: string}) {
  const [stackUrl, setStackUrl] = React.useState(stackUrlProps);
  const [stackName, setStackName] = React.useState(stackNameProps);
  const dispatch = useDispatch();
  async function editStackRequest(stack: { id:string, name: string; iconUrl: string }) {
    try {
    const res = await editStackAction(stack); 
    dispatch(updateStack(res.data.stack));
    toast.success(res.data.message)
  } catch (error) {
      console.log(error)
      toast.error("An error occured")
    }
  }
  React.useEffect(() => {}, [stackUrl]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stack information</DialogTitle>
          <DialogDescription>
            Make sure that your informations are up to date.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Stack Name
            </Label>
            <Input
              id="name"
              value={stackName}
              className="col-span-3"
              onChange={(e) => {
                setStackName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Image URL
            </Label>{" "}
            <Button
              size={"sm"}
              style={{ width: 50 }}
              onClick={() => {
                navigator.clipboard.readText().then((text) => {
                  setStackUrl(text);
                });
              }}
            >
              <ClipboardCopyIcon />
            </Button>
          </div>
          <Image
            src={stackUrl}
            width={50}
            height={50}
            style={{ margin: "auto" }}
            alt="icon"
          />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              disabled={stackName == ""}
              onClick={() => {
                editStackRequest({id, name: stackName, iconUrl: stackUrl });
              }}
            >
              updateStack
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
