import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (_request: Request): Promise<Response> => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer re_je1acVrr_6sVtn2nCtADqkrRMmJNEwCqX`,
    },
    body: JSON.stringify({
      from: "TrasuaTopOne@trasuatopone.online",
      to: "dngocson12@gmail.com",
      subject: "Thông báo có đơn hàng mới",
      html: `<div style="color:blue;">
      <h1>Bạn đã có một đơn hàng mới</h1>
      <p><a style="font-size:25px" href="https://www.trasuatopone.online/admin/order">Kiểm tra đơn hàng</a></p>
  </div>`,
    }),
  });
  // const res= await fetch('https://fakestoreapi.com/products')
  const data = await res.json();
  console.log("function run");
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

serve(handler);
// npx supabase functions deploy resend --project-ref rencklphdevxcyjmpobp
