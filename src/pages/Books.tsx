import { Link } from "react-router-dom";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { bookList } from "@/http/api";
import { Input } from "@/components/ui/input";

const Books = () => {
  const data = useQuery({
    queryKey: ["books"],
    queryFn: bookList,
    enabled: true,
  });

  console.log("books data", data.data);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/home">Home</Link>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <DropdownMenu></DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <Link to="/books">Books</Link>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            {/* <Link to="/books/add"  className="h-8 gap-1">
            
            </Link> */}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">
                  <PlusCircle className="h-3.5 w-3.5 mr-2" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Books
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Books</AlertDialogTitle>
                  <AlertDialogDescription className="flex flex-col gap-4">
                    <Input type="text" placeholder="enter the title" />
                    <Input type="text" placeholder="enter the title" />
                    <Input type="file" />
                    <Input type="file" />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      <main className="grid flex-1 items-start gap-2 p-2 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Books</CardTitle>
                <CardDescription>
                  Manage your Books and view their sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>

                      <TableHead className="hidden md:table-cell">
                        Total Sales
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* * Table Body */}

                  {data?.data?.length === 0 ? (
                    <p>no data</p>
                  ) : (
                    data?.data?.map((item: any) => {
                      return (
                        <TableBody className="">
                          <TableRow>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={item.coverImage}
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {item.title}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.genre}</Badge>
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {item.createdAt}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })
                  )}
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Books;
