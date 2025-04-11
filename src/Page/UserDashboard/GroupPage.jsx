import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersRound, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GroupPage = () => {
  // Mock data for demonstration
  const groups = [
    {
      id: 1,
      name: "Lekki Food Co-op",
      usersJoined: 3,
      maxUsers: 5,
      deliveryDate: "2025-04-15",
      landmark: "Lekki Phase 1",
      items: "Groceries, Vegetables",
      status: "pending",
    },
    {
      id: 2,
      name: "Ikeja Bulk Buyers",
      usersJoined: 5,
      maxUsers: 5,
      deliveryDate: "2025-04-18",
      landmark: "Ikeja GRA",
      items: "Electronics, Home Goods",
      status: "completed",
    },
    {
      id: 3,
      name: "Victoria Island Shoppers",
      usersJoined: 2,
      maxUsers: 4,
      deliveryDate: "2025-04-20",
      landmark: "Eko Hotel Roundabout",
      items: "Office Supplies, Snacks",
      status: "pending",
    },
    {
      id: 4,
      name: "Yaba Tech Group",
      usersJoined: 4,
      maxUsers: 6,
      deliveryDate: "2025-04-14",
      landmark: "Yaba College",
      items: "Tech Gadgets, Accessories",
      status: "cancelled",
    },
    {
      id: 5,
      name: "Ajah Weekend Market",
      usersJoined: 3,
      maxUsers: 8,
      deliveryDate: "2025-04-22",
      landmark: "Ajah Junction",
      items: "Fresh Produce, Meat",
      status: "pending",
    },
  ];

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      completed: "bg-green-100 text-green-800 hover:bg-green-100",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
    };

    return (
      <Badge className={`${statusStyles[status]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-6">
      <div className="border rounded-md p-6 mb-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Group</h2>
            <p className="text-gray-600">
              All Groups Available Groups near you!
            </p>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <UsersRound size={18} />
              <span>Join Group</span>
            </Button>

            <Button className="text-white bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] hover:opacity-90 flex items-center gap-2">
              <Plus size={18} />
              <span>Create Group</span>
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="font-semibold">Group Name</TableHead>
                <TableHead className="font-semibold">Users Joined</TableHead>
                <TableHead className="font-semibold">Delivery Date</TableHead>
                <TableHead className="font-semibold">Landmark</TableHead>
                <TableHead className="font-semibold">Items</TableHead>
                <TableHead className="font-semibold">Action</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell className="font-medium">{group.name}</TableCell>
                  <TableCell>
                    {group.usersJoined}/{group.maxUsers}
                  </TableCell>
                  <TableCell>
                    {new Date(group.deliveryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{group.landmark}</TableCell>
                  <TableCell>{group.items}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={
                        group.usersJoined >= group.maxUsers ||
                        group.status === "completed" ||
                        group.status === "cancelled"
                      }
                    >
                      Join Now
                    </Button>
                  </TableCell>
                  <TableCell>{getStatusBadge(group.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </Button>

          <div className="flex items-center gap-2">
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className={page === 1 ? "bg-[#4A9D44] hover:bg-[#0D5F07]" : ""}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
