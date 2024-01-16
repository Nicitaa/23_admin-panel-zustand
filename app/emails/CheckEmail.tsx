import { Head, Html, Preview, Body, Section, Img, Heading, Text, Link } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import { formatCurrency } from "../utils/currencyFormatter"
import { IProduct } from "../interfaces/IProduct"
import { getURL } from "@/utils/helpers"

interface CheckEmailProps {
  products: IProduct[]
  deliveryDate: string
}

export const CheckEmail = ({ products, deliveryDate }: CheckEmailProps) => {
  const previewText = `Thank you for your purchace`
  return (
    <Tailwind
      config={{
        theme: {
          screens: {
            // read dev_readme.md
          },
          extend: {
            colors: {
              brand: "#1ce956",
              subTitle: "#999999",
              "broder-color": "#999999",
              title: "#e0e0e0",
              info: "407ded",
            },
          },
        },
      }}>
      <Html>
        <Head />
        <Preview>{previewText}</Preview>

        <Body className="bg-[#202020]" style={{ width: "480px", margin: "0 auto", padding: "20px 0 48px" }}>
          {/* CONTENT - START */}

          {/* HEADER */}
          <Section style={{ width: "480px", maxWidth: "480px" }}>
            <Heading className="m-0 pt-8 text-title text-center">{previewText}</Heading>
            <Text className="m-0 pb-8 text-subTitle text-center">Your order will delivered on {deliveryDate} 🗓</Text>
          </Section>

          {/* MAIN CONTENT */}
          <Section className="w-[480px] max-w-[480px] mb-2 border border-solid border-border-color pb-0">
            {products &&
              products.length > 0 &&
              products.map(product => (
                <Section className="mb-2" key={product.id}>
                  <Img
                    style={{ objectFit: "cover" }}
                    src={product.img_url[0]}
                    width="480"
                    height="240"
                    alt={product.title}
                  />
                  <Text className="m-0 px-4 py-2 text-title text-2xl text-center">{product.title}</Text>
                  <Text className="mb-8 mt-0 text-title text-xl text-center">{formatCurrency(product.price)}</Text>
                  <Text className="m-0 text-title text-lg text-center">
                    Quantity:
                    <span className="m-0 text-subTitle">{product.quantity}</span>{" "}
                  </Text>
                  <Text className="m-0 text-title text-lg text-center">
                    Sub-total:
                    <span className="m-0 text-subTitle">{formatCurrency(product.price * product.quantity)}</span>
                  </Text>
                </Section>
              ))}
          </Section>

          {/* TOTAL */}
          <table
            style={{
              borderTop: "1px solid #999999",
              borderBottom: "1px solid #999999",
              minWidth: "100%",
              margin: "3rem 0rem",
              padding: "1rem 0rem",
              textAlign: "center",
            }}>
            <tr>
              <td>
                <Text className="m-0 text-title text-2xl text-center">
                  Total:&nbsp;
                  {formatCurrency(
                    products.reduce((totalPrice, product) => totalPrice + product.price * product.quantity, 0),
                  )}
                </Text>
              </td>
            </tr>
          </table>

          {/* FOOTER */}
          <table
            style={{
              borderTop: "2px solid #999999",
              minWidth: "100%",
              margin: "1rem 0rem",
              padding: "1rem 0rem",
              textAlign: "center",
            }}>
            <tr>
              <td>
                <Link className="m-0 text-[#407ded] text-sm text-center mr-4" href={`${getURL()}support`}>
                  Support
                </Link>
                <Link className="m-0 text-[#407ded] text-sm text-center mr-4" href={`${getURL()}feedback`}>
                  Feedback
                </Link>
                <Link className="m-0 text-[#407ded] text-sm text-center" href={`${getURL()}track-order`}>
                  Track order
                </Link>
              </td>
            </tr>
          </table>
          {/* CONTENT - END */}
        </Body>
      </Html>
    </Tailwind>
  )
}

export default CheckEmail
