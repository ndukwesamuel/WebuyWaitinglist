import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UsersRound,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

const GroupPage = () => {
  // State for modal visibility
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [filteredGroups, setFilteredGroups] = useState([]);

  // Form states
  const [createGroupForm, setCreateGroupForm] = useState({
    name: "",
    items: "",
    landmark: "",
    usersNeeded: "",
    deliveryDate: null,
  });

  const [joinGroupForm, setJoinGroupForm] = useState({
    selectedGroup: "",
  });

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
    {
      id: 6,
      name: "Surulere Shopping Network",
      usersJoined: 2,
      maxUsers: 4,
      deliveryDate: "2025-04-17",
      landmark: "Surulere",
      items: "Fashion, Clothing, Shoes",
      status: "pending",
    },
    {
      id: 7,
      name: "Ikoyi Luxury Buyers",
      usersJoined: 3,
      maxUsers: 6,
      deliveryDate: "2025-04-19",
      landmark: "Ikoyi",
      items: "Premium Goods, Luxury Items",
      status: "completed",
    },
  ];

  // Available landmarks for select options
  const landmarks = [
    "Lekki Phase 1",
    "Ikeja GRA",
    "Eko Hotel Roundabout",
    "Yaba College",
    "Ajah Junction",
    "Surulere",
    "Ikoyi",
    "Victoria Island",
  ];

  // Status options for filtering
  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  // Landmark options for filtering
  const landmarkOptions = [
    { value: "all", label: "All Landmarks" },
    ...landmarks.map((landmark) => ({ value: landmark, label: landmark })),
  ];

  // Search and filter fields
  const searchFields = [
    { value: "all", label: "All Fields" },
    { value: "name", label: "Group Name" },
    { value: "items", label: "Items" },
    { value: "landmark", label: "Landmark" },
    { value: "status", label: "Status" },
  ];

  // Apply search and filters
  useEffect(() => {
    let results = [...groups];

    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter((group) => {
        if (filterCriteria === "all") {
          return (
            group.name.toLowerCase().includes(lowercasedSearch) ||
            group.items.toLowerCase().includes(lowercasedSearch) ||
            group.landmark.toLowerCase().includes(lowercasedSearch) ||
            group.status.toLowerCase().includes(lowercasedSearch)
          );
        } else {
          return group[filterCriteria]
            ?.toLowerCase()
            .includes(lowercasedSearch);
        }
      });
    }

    setFilteredGroups(results);
  }, [searchTerm, filterCriteria]);

  // Handle create form changes
  const handleCreateFormChange = (field, value) => {
    setCreateGroupForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Check if create form is valid
  const isCreateFormValid = () => {
    return (
      createGroupForm.name &&
      createGroupForm.items &&
      createGroupForm.landmark &&
      createGroupForm.usersNeeded &&
      createGroupForm.deliveryDate
    );
  };

  // Check if join form is valid
  const isJoinFormValid = () => {
    return joinGroupForm.selectedGroup !== "";
  };

  // Get selected group details
  const getSelectedGroupDetails = () => {
    if (!joinGroupForm.selectedGroup) return null;
    return groups.find(
      (group) => group.id === parseInt(joinGroupForm.selectedGroup)
    );
  };

  // Handle submit for create group
  const handleCreateGroup = () => {
    // Logic to create group would go here
    console.log("Creating group:", createGroupForm);
    setCreateModalOpen(false);
    // Reset form
    setCreateGroupForm({
      name: "",
      items: "",
      landmark: "",
      usersNeeded: "",
      deliveryDate: null,
    });
  };

  // Handle submit for join group
  const handleJoinGroup = () => {
    // Logic to join group would go here
    console.log("Joining group:", joinGroupForm.selectedGroup);
    setJoinModalOpen(false);
    // Reset form
    setJoinGroupForm({ selectedGroup: "" });
  };

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

  const selectedGroup = getSelectedGroupDetails();

  return (
    <div className="p-4 md:p-6">
      <div className="border rounded-md p-4 md:p-6 mb-6 md:mb-8">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Group
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              All Groups Available Groups near you!
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:space-x-3 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-sm h-9 px-3 flex-1 sm:flex-auto"
              onClick={() => setJoinModalOpen(true)}
            >
              <UsersRound size={16} />
              <span>Join Group</span>
            </Button>

            <Button
              className="text-white bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] hover:opacity-90 flex items-center gap-2 text-sm h-9 px-3 flex-1 sm:flex-auto"
              onClick={() => setCreateModalOpen(true)}
            >
              <Plus size={16} />
              <span>Create Group</span>
            </Button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="flex gap-2">
              <Select value={filterCriteria} onValueChange={setFilterCriteria}>
                <SelectTrigger className="w-[160px] h-10">
                  <SelectValue placeholder="Search by..." />
                </SelectTrigger>
                <SelectContent>
                  {searchFields.map((field) => (
                    <SelectItem key={field.value} value={field.value}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="flex items-center gap-1 h-10"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter size={16} />
                <span className="hidden md:inline">Filters</span>
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {filterOpen && (
            <div className="mt-3 p-3 border rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-sm mb-1 block">Status</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm mb-1 block">Landmark</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Filter by landmark" />
                    </SelectTrigger>
                    <SelectContent>
                      {landmarkOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm mb-1 block">Delivery Date</Label>
                  <Input type="date" className="h-9" />
                </div>
              </div>

              <div className="flex justify-end mt-3 gap-2">
                <Button variant="outline" size="sm">
                  Reset
                </Button>
                <Button size="sm" className="bg-[#4A9D44] hover:bg-[#0D5F07]">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Table Section (Desktop) */}
        <div className="rounded-md border hidden md:block">
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
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group) => (
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
                        onClick={() => {
                          setJoinGroupForm({
                            selectedGroup: group.id.toString(),
                          });
                          setJoinModalOpen(true);
                        }}
                      >
                        Join Now
                      </Button>
                    </TableCell>
                    <TableCell>{getStatusBadge(group.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-500"
                  >
                    No groups found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Card View for Mobile */}
        <div className="space-y-4 md:hidden">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <Card key={group.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-bold">
                      {group.name}
                    </CardTitle>
                    {getStatusBadge(group.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div className="text-gray-500">Users:</div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1 text-gray-400" />
                      {group.usersJoined}/{group.maxUsers}
                    </div>

                    <div className="text-gray-500">Delivery:</div>
                    <div>
                      {new Date(group.deliveryDate).toLocaleDateString()}
                    </div>

                    <div className="text-gray-500">Landmark:</div>
                    <div>{group.landmark}</div>

                    <div className="text-gray-500">Items:</div>
                    <div className="truncate">{group.items}</div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    disabled={
                      group.usersJoined >= group.maxUsers ||
                      group.status === "completed" ||
                      group.status === "cancelled"
                    }
                    onClick={() => {
                      setJoinGroupForm({ selectedGroup: group.id.toString() });
                      setJoinModalOpen(true);
                    }}
                  >
                    Join Now
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 px-4 border rounded-md bg-gray-50">
              <p className="text-gray-500">
                No groups found matching your search criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination - Responsive */}
        {filteredGroups.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
              <ChevronLeft size={16} className="sm:mr-1" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-1 sm:gap-2">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    page === 1 ? "bg-[#4A9D44] hover:bg-[#0D5F07]" : ""
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={16} className="sm:ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Create Group Modal - Responsive */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-md max-w-[95vw] p-4 sm:p-6 bg-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Create Group</DialogTitle>
            </div>
            <DialogDescription className="text-sm">
              Create a new group for shopping together
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="group-name" className="text-sm">
                Group Name
              </Label>
              <Input
                id="group-name"
                placeholder="Enter group name"
                value={createGroupForm.name}
                onChange={(e) => handleCreateFormChange("name", e.target.value)}
                className="h-9"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="group-items" className="text-sm">
                Items
              </Label>
              <Input
                id="group-items"
                placeholder="E.g. Groceries, Electronics"
                value={createGroupForm.items}
                onChange={(e) =>
                  handleCreateFormChange("items", e.target.value)
                }
                className="h-9"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="landmark" className="text-sm">
                Landmark
              </Label>
              <Select
                value={createGroupForm.landmark}
                onValueChange={(value) =>
                  handleCreateFormChange("landmark", value)
                }
              >
                <SelectTrigger id="landmark" className="h-9">
                  <SelectValue placeholder="Select a landmark" />
                </SelectTrigger>
                <SelectContent>
                  {landmarks.map((landmark) => (
                    <SelectItem key={landmark} value={landmark}>
                      {landmark}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="users-needed" className="text-sm">
                Users Needed
              </Label>
              <Select
                value={createGroupForm.usersNeeded}
                onValueChange={(value) =>
                  handleCreateFormChange("usersNeeded", value)
                }
              >
                <SelectTrigger id="users-needed" className="h-9">
                  <SelectValue placeholder="Select max users" />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} users
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="delivery-date" className="text-sm">
                Delivery Date
              </Label>
              <Input
                id="delivery-date"
                type="date"
                value={createGroupForm.deliveryDate || ""}
                onChange={(e) =>
                  handleCreateFormChange("deliveryDate", e.target.value)
                }
                min={new Date().toISOString().split("T")[0]}
                className="h-9"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] hover:opacity-90 h-9"
              disabled={!isCreateFormValid()}
              onClick={handleCreateGroup}
            >
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Join Group Modal - Responsive */}
      <Dialog open={joinModalOpen} onOpenChange={setJoinModalOpen}>
        <DialogContent className="sm:max-w-md max-w-[95vw] p-4 sm:p-6 bg-white">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Join Group</DialogTitle>
            </div>
            <DialogDescription className="text-sm">
              Join an existing shopping group
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="select-group" className="text-sm">
                Select Group
              </Label>
              <Select
                value={joinGroupForm.selectedGroup}
                onValueChange={(value) =>
                  setJoinGroupForm({ selectedGroup: value })
                }
              >
                <SelectTrigger id="select-group" className="h-9">
                  <SelectValue placeholder="Select a group to join" />
                </SelectTrigger>
                <SelectContent>
                  {groups
                    .filter(
                      (group) =>
                        group.usersJoined < group.maxUsers &&
                        group.status === "pending"
                    )
                    .map((group) => (
                      <SelectItem key={group.id} value={group.id.toString()}>
                        {group.name} ({group.usersJoined}/{group.maxUsers})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Label>Items</Label>
              <Input disabled></Input>
            </div>

            {selectedGroup && (
              <div className="border rounded-md p-3 bg-gray-50 text-sm">
                <h4 className="font-medium mb-2">Group Details</h4>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className="text-gray-500">Items:</div>
                  <div>{selectedGroup.items}</div>

                  <div className="text-gray-500">Landmark:</div>
                  <div>{selectedGroup.landmark}</div>

                  <div className="text-gray-500">Delivery Date:</div>
                  <div>
                    {new Date(selectedGroup.deliveryDate).toLocaleDateString()}
                  </div>

                  <div className="text-gray-500">Available Spots:</div>
                  <div>
                    {selectedGroup.maxUsers - selectedGroup.usersJoined} spots
                    left
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-gradient-to-b from-[#4A9D44] to-[#0D5F07] hover:opacity-90 h-9"
              disabled={!isJoinFormValid()}
              onClick={handleJoinGroup}
            >
              Join Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupPage;
