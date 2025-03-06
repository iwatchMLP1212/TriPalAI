"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const DesktopSidebar = ({
  renderHistory,
  searchQuery,
  setSearchQuery,
}: {
  renderHistory: () => React.ReactNode;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  return (
    <div className="hidden lg:block fixed left-0 top-0 h-screen w-72 border-r bg-background z-40">
      <div className="p-4 h-full flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Lịch sử</h2>
          <Button className="w-full gap-2" onClick={() => router.push("/chat")}>
            <Plus className="h-4 w-4" />
            Đoạn chat mới
          </Button>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Tìm đoạn chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-lg"
          />
        </div>

        <div className="overflow-y-auto flex-1 pb-4">{renderHistory()}</div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
