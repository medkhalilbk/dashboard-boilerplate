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
import { addStack } from "@/lib/features/stackSlice";
import { addStackAction } from "@/lib/actions/stacks";
import { toast } from "sonner";
export default function DialogAddStack() {
  const [stackUrl, setStackUrl] = React.useState(
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  );
  const [stackName, setStackName] = React.useState("");
  const dispatch = useDispatch();
  async function addstackRequest(stack: { name: string; iconUrl: string }) {
    try {
    const res = await addStackAction(stack);
    dispatch(addStack(res.data.stack));
    toast.success(res.data.message)
  } catch (error) {
      toast.error("An error occured")
    }
  }
  React.useEffect(() => {}, [stackUrl]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
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
                addstackRequest({ name: stackName, iconUrl: stackUrl });
              }}
            >
              Add stack
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
