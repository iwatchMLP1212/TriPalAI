"use client";

import { Settings } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import SettingDialog from "./SettingDialog";

const SettingButton = ({ slug }: { slug: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Dialog>
        <DialogTrigger>
          <div className="p-2 text-black hover:bg-gray-200 transition-all rounded-full cursor-pointer">
            <Settings size={24} />
          </div>
        </DialogTrigger>
        <SettingDialog slug={slug} />
      </Dialog>
    </QueryClientProvider>
  );
};

export default SettingButton;
