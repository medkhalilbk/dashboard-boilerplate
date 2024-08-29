import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IOrderDetails } from "./cartResultTypes";
import { Spinner } from "../spinner";
import { Button } from "../button";
import { Badge } from "../badge";
import { stringAvatar } from "@/lib/utils";
import Swal from "sweetalert2";
import axios from "axios";

export default function DataTablesOrders({
  orders,
}: {
  orders: IOrderDetails[] | [];
}) {
  const [ordersState, setOrdersState] = React.useState<any>([]);
  const [companyId, setCompanyId] = React.useState<string | null>(null);
  React.useEffect(() => {
    setOrdersState(orders.map((order) => createDataOrder(order)));
  }, [orders]);
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const companyId = localStorage.getItem("id");
      if (companyId) {
        setCompanyId(companyId);
      }
    }
  }, []);
  function stepStatusText(status: string) {
    switch (status) {
      case "step0":
        return "En attente de livreur";
      case "step1":
        return "Livreur en route";
      case "step2":
        return "Commande prête";
      case "step3":
        return "Commande livrée";
      case "step4":
        return "Commande en route";
      case "step5":
        return "Commande livrée";
      default:
        return "En attente de livreur";
    }
  }
  function createDataOrder(obj: IOrderDetails): any {
    const date = new Date(obj.createdAt);
    const formattedDate = date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    });

    return {
      id: obj.id,
      status: obj.status,
      totalPrice: obj.totalPrice,
      location: obj.location,
      date: formattedDate,
      details: {
        client: obj.customer,
        orders: obj.orders,
        deliveryMan: obj.deliveryMan,
      },
    };
  }
  function Row(props: { row: ReturnType<typeof createDataOrder> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false); 
    const [isConfirmed, setIsConfirmed] = React.useState(row.details.orders.map((order: any) => order.status === "Ready" || order.status === "Ready" ).includes(false) ? false : true);
    
   async function markAsCompletedRequest(cart: any) {
     try {
      let {id} = cart
      let res = await axios.post(`/api/companies/${companyId}/mark-as-completed` , {cartId:id})
      return res
     } catch (error) {
      throw error
     }
    }

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            Livraison de {row.details.client.name}{" "}
            <p>
              <b>{(row.id as string).slice(-5)}</b>
            </p>
          </TableCell>
          <TableCell align="center" className="table-order-cell">
            {(row.status === "step0" || row.status === "step4") && (
              <Badge variant={"outline"}>
                <h1 className="text-orange-400">
                  {stepStatusText(row.status)}
                </h1>
              </Badge>
            )}
            {(row.status === "step1" ||
              row.status === "step3" ||
              row.status === "step5") && (
              <Badge variant={"outline"}>
                <h1 className="text-green-400">{stepStatusText(row.status)}</h1>
              </Badge>
            )}
          </TableCell>

          <TableCell align="right">{row.totalPrice}</TableCell>
          <TableCell align="right">{row.date}</TableCell>
          <TableCell className="table-order-cell" align="right">
            {typeof row.details.deliveryMan == "string" ? (
              row.details.deliveryMan
            ) : (
              <Badge variant={"outline"}>
                <h1 className="text-green-800">
                  {" "}
                  {row.details.deliveryMan.fullName}{" "}
                </h1>
              </Badge>
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Détails
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Produit(s)</TableCell>
                      <TableCell>Prix</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Livreur</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div>
                          {row.details.orders.map((order: any, k: number) => {
                            const { quantity, product } = order;
                            const { name, price, description, mainImageUrl } =
                              product;
                            return (
                              <div
                                key={k}
                                className="block mx-auto w-1/2 p-6 pt-0 my-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                              >
                                <img
                                  src={mainImageUrl}
                                  alt={name}
                                  className="w-24 rounded-full h-24 object-cover rounded-t-lg mb-4"
                                />
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  {name} ({quantity})
                                </h5>
                                <p className="font-normal text-wrap text-gray-700 dark:text-gray-400">
                                  {description}
                                </p>
                                <p className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                                  Prix: {price} DT
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell align="center" className="table-order-cell">
                        <h1>{row.totalPrice} </h1>
                      </TableCell>
                      <TableCell className="table-order-cell">
                        <div className="max-w-fit py-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                          <Avatar
                            className="mx-auto"
                            {...stringAvatar(row.details.client.name)}
                          />

                          <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                              {row.details.client.name}
                            </h5>

                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                              {row.details.client.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="table-order-cell">
                        {typeof row.details.deliveryMan == "string" ? (
                          <h1>En attente de réponse</h1>
                        ) : (
                          <>
                            <div className="max-w-md mx-auto bg-white shadow-md rounded-sm p-4">
                              <h2 className="text-lg font-semibold mb-2">
                                {row.details.deliveryMan.fullName}
                              </h2>
                              <div className="text-gray-700 mb-1">
                                <strong>Téléphone: </strong>{" "}
                                {row.details.deliveryMan.phoneNumber}
                              </div>
                              <div className="text-gray-700 mb-1">
                                <strong>Commandes Complétés: </strong>{" "}
                                {row.details.deliveryMan.ordersCompleted}
                              </div>
                              <div className="text-gray-700 mb-1">
                                <strong>Commandes en Cours: </strong>{" "}
                                {row.details.deliveryMan.cartsInProgress}
                              </div>
                              <div className="text-gray-700 mb-1">
                                <strong>Numéro de Véhicule: </strong>{" "}
                                {row.details.deliveryMan.vehiculeSerialNumber}
                              </div>
                              {!isConfirmed && <Button onClick={() => {
                                Swal.fire({
                                  title:"êtes-vous sûr?",
                                  text:"Voulez-vous vraiment marquer cette commande comme prête?",
                                  icon:"warning",
                                  showCancelButton:true,
                                  confirmButtonText:"Oui",
                                  cancelButtonText:"Non", 
                                  cancelButtonColor:"#ff0000",
                                  confirmButtonColor:"#16A34A",
                                }).then((res) => {
                                  if(res.isConfirmed){
                                    markAsCompletedRequest(row).then((res:any) => { 
                                      Swal.fire({text:res.data.message , icon:"success" , confirmButtonColor:"#16A34A"}) 
                                      setIsConfirmed(true)
                                    })
                                  }
                                })
                              }} className="bg-green-400 hover:bg-green-600">Commande prête</Button>}
                            </div>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  if (orders.length === 0) {
    return <Spinner size={"large"} />;
  } else {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className="text-2xl">Commandes 📝 </TableCell>
              <TableCell align="center" className="text-2xl">
                État
              </TableCell>
              <TableCell className="text-2xl" align="right">
                Prix
              </TableCell>
              <TableCell className="text-2xl" align="right">
                Heure & Date
              </TableCell>
              <TableCell align="right" className="text-2xl">
                Livreur
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersState.map((row: any, k: number) => (
              <Row key={k} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
