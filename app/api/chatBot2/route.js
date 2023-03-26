import getGPTResponse2 from "@/lib/openai/chatBot2";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const output = await getGPTResponse2(searchParams.get("prompt"));

  return new Response(output, {
    status: 200,
  });
}
