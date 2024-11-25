import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";
import { Novu } from "./components/novu.components";
import NewProduct from "./components/new.product";
import { revalidatePath } from "next/cache";
import BidInput from "./components/bid.input";
import axios from "axios";
import { Novu as NovuId } from "@novu/node";
import LogoutButton from "./components/LogoutButton";

const NOVU_API_KEY = process.env.NOVU_SECRET_KEY;
const novuData = new NovuId(`${NOVU_API_KEY}`);

export default async function Home() {
  const login = cookies().get("login");
  // Identify the user as a subscriber
  let subscriber;
  try {
    subscriber = await novuData.subscribers.identify(login?.value, {
      name: `${login?.value}`,
    });
    console.log("Identified subscriber:", subscriber);
  } catch (error) {
    console.error("Error identifying subscriber:", error);
    return <div>Error identifying subscriber</div>;
  }

  const addBid = async (id: number, bid: number) => {
    "use server";
    await sql`UPDATE bids SET total_bids = total_bids + ${bid} WHERE id = ${id}`;

    try {
      await axios.post("http://localhost:4000/api/trigger", {
        subscriberId: `${login?.value}`,
        workflowId: "send-notification-inapp",
        payload: {
          subject: "Bid Updated",
          body: `Bid Updated ${bid}`,
        },
      });
    } catch (error) {
      console.error("Error triggering notification:", error);
    }

    revalidatePath("/");
  };

  const addProduct = async (product: string) => {
    "use server";

    await sql`INSERT INTO bids (name, owner, total_bids) VALUES(${product}, ${login?.value}, 0)RETURNING id`;

    try {
      await axios.post("http://localhost:4000/api/trigger", {
        subscriberId: `${login?.value}`,
        workflowId: "send-notification-inapp",
        payload: {
          subject: "Bid Created",
          body: `New Bid is Created`,
        },
      });
    } catch (error) {
      console.error("Error triggering notification:", error);
    }

    revalidatePath("/");
  };
  const { rows } = await sql`SELECT * FROM bids ORDER BY id DESC`;

  return (
    <div className="">
      <div className="flex justify-between  ">
        <h2 className="mb-10 font-bold text-3xl">
          Logged in User: {login?.value}
        </h2>
        <div className="flex">
          <Novu user={login?.value ?? ""} />
          <LogoutButton />
        </div>
      </div>
      <NewProduct addProduct={addProduct} />
      {rows.map((product) => (
        <div
          className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          key={product.name}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Product Name: {product.name}
          </h5>
          <h5 className="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-white">
            Product Owner: {product.owner}
          </h5>
          <h5 className="mb-2 text-xl font-normal tracking-tight text-gray-900 dark:text-white">
            Product Bids: {product.total_bids}
          </h5>
          <div>
            <BidInput addBid={addBid} id={product.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
