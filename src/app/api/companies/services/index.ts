import {PrismaClient } from "@prisma/client";
import { getOrderByIdService } from "../../oders/services";
import * as NodeGeocoder from 'node-geocoder';
const prisma = new PrismaClient();

export async function getAllCompaniesService() {
  try {
    const companies = await prisma.companies.findMany();
    return companies;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCompanyService(company: any) {
  try {
    let {latitude,longitude} = company.location
    let apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API}`
    let response = await fetch(apiUrl)
    let data = await response.json()
    let address = data.results[0].formatted_address as string
    let region = address.split(",")[1].trim()


    const newCompany = await prisma.companies.create({
      data: {
        name: company.name,
        description: company.description,
        phoneNumber: company.phoneNumber,
        location: company.location,
        availabilityDistance: company.availabilityDistance,
        mainImage: company.mainImage,
        otherImages: company.otherImages,
        workHours: company.workHours,
        type: company.type,
        specialty: company.specialty,
        keywords: company.keywords,
        days: company.days,
        region:region
      },
    });

    return newCompany;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
}

export async function getCompanyByIdService(id: string) {
  try {
    const company = await prisma.companies.findUnique({ where: { id: id } });
    return company;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getProductsByCompanyIdService(companyId: string) {
  try {
    const products = await prisma.products.findMany({
      where: { companyId },
    });
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function updateCompanyService(id: string, company: any) {
  try {
    const companyUpdated = await prisma.companies.update({
      where: { id },
      data: { ...company },
    });
    return companyUpdated;
  } catch (error) {
    throw error;
  }
}

export async function getUserByCompanyIdService(companyId: string) {
  console.log(companyId)
  try {
    const user = await prisma.users.findFirst({
      where: {
        companyId: companyId,
      },
    }); 
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteCompanyService(id:string) {
  try {
    await prisma.companies.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getOrdersByCompanyIdService({ companyId }: { companyId: string }) {
  try {
    // Fetch all carts associated with the company
    let carts: any = await prisma.carts.findMany({
      where: { 
        companiesIds :{
          has:companyId
        }
      } , 
      orderBy:{
        createdAt:"desc"
      }
    }); 
    const allOrderIds = carts.flatMap((cart: any) => cart.orders);

    // Fetch all orders by their IDs
    const allOrders = await prisma.orders.findMany({
      where: {
        
        id: {
          in: allOrderIds
        }
      }
    });

    
    // Filter orders by the provided restaurantId (companyId)
     

    // Extract all product IDs from the orders
    const productIds = allOrders.map(order => order.productId);

    // Fetch products by their IDs
    const allProducts = await prisma.products.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });

    // Create a map of product ID to product details for quick lookup
    const productsMap = new Map(allProducts.map(product => [product.id, product]));

    // Attach products to their corresponding orders
    const ordersWithProducts = allOrders.map(order => ({
      ...order,
      product: productsMap.get(order.productId) // Attach product details to the order
    }));

    // Extract all delivery man IDs from the carts
    const deliveryManIds = carts.map((cart: any) => cart?.deliveryManAccountId);
 
    let deliveryManIdsFiltered = deliveryManIds.filter((id:any)=> id !== null )
     
    let deliveryMansMap = new Map()
    if(deliveryManIdsFiltered.length !== 0 ){
        const allDeliveryMans = await prisma.deliveryMans.findMany({
      where: {
        id: {
          in: deliveryManIdsFiltered
        }
      }
    });
    deliveryMansMap = new Map(allDeliveryMans.map(dm => [dm.id, dm]));
    }
    
    const clientIds = carts.map((cart: any) => cart.clientId);
    const allClients = await prisma.users.findMany({
      where: {
        id: {
          in: clientIds
        }
      }
    });

    // Create a map of client ID to client details for quick lookup
    const clientsMap = new Map(allClients.map(client => [client.id, client]));

    // Attach products, delivery men, and clients to their corresponding carts
    const formattedCarts = carts.map((cart: any) => {
      const cartOrders = ordersWithProducts.filter(order => cart.orders.includes(order.id));
      return {
        ...cart,
        orders: cartOrders.map((order: any) => ({
          id: order.id,
          quantity: order.quantity,
          price: order.price,
          product: order.product,
          status: order.status
        })),
        deliveryMan: deliveryMansMap.get(cart.deliveryManAccountId) || "On attente de réponse", // Attach delivery man details to the cart
        customer: clientsMap.get(cart.clientId) // Attach client details to the cart
      };
    }); 
    const filteredCartsByCompanyId = formattedCarts
    .filter((cart:any) => 
      cart.orders.some((order:any) => order.product.companyId === companyId)
    );
    return filteredCartsByCompanyId;
   // remove unsued carts 
  

  } catch (error) {
    console.error("Error retrieving carts and orders:", error);
    throw new Error("Could not retrieve carts and orders");
  }
}


export async function updateOrdersByCartId(cartId: string, companyId:string) {
  try {
     let cart = await prisma.carts.findUnique({
      where: {
        id: cartId,
      },
     })
     let restaurantDetails = await prisma.companies.findUnique({
        where:{
          id:companyId
        }
     })

     if(!cart) throw new Error("Cart not found")
      let orders = await prisma.orders.updateMany({
        where: {
          id: {
            in: cart.orders,
          }, 
          restaurantId:companyId
        } , 
      data :{
        status:"Ready"
      }})
      return {orders,restaurantDetails}
  } catch (error) {
    console.log(error);
    throw error;
  }
}