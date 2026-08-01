import { Button } from "./Button"

interface CardParams {

}

export const Card = ({}: CardParams) => {
  return (
    <div className="border flex flex-col w-64">
      <div>
        <img src="public/skoda-octavia-a7.jpg" />
      </div>
      <div>
        <h2 className="font-medium text-emerald-900">Fucking Header</h2>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt tristique leo eget porttitor. Integer tortor diam, fermentum sed ligula.
        </p>
        <Button size="sm">View</Button>
      </div>
    </div>
  )
}