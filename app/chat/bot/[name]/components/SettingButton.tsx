"use client";

import { Settings } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SettingDialog from "./SettingDialog";

const SettingButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="p-2 text-black hover:bg-gray-200 transition-all rounded-full cursor-pointer">
            <Settings size={24} />
          </div>
        </DialogTrigger>
        <SettingDialog />
      </Dialog>
    </>
  );
};

export default SettingButton;
