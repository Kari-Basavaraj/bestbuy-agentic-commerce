export default function SupportPage() {
  const supportOptions = [
    {
      title: 'Track Order',
      description: 'Check the status of your recent orders',
      icon: '📦',
      action: 'Track Now'
    },
    {
      title: 'Returns & Exchanges',
      description: 'Start a return or exchange',
      icon: '🔄',
      action: 'Start Return'
    },
    {
      title: 'Reschedule Delivery',
      description: 'Change your delivery window',
      icon: '🚚',
      action: 'Reschedule'
    },
    {
      title: 'Geek Squad Services',
      description: 'Schedule installation or repair',
      icon: '🔧',
      action: 'Book Service'
    },
    {
      title: 'Extend Protection',
      description: 'Add or extend product protection',
      icon: '🛡️',
      action: 'Add Protection'
    },
    {
      title: 'Chat with Expert',
      description: '24/7 support from real people',
      icon: '💬',
      action: 'Chat Now'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-bestbuy-blue to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            How can we help you today?
          </h1>
          <p className="text-xl text-blue-100">
            Fast support for orders, returns, and tech questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="text-5xl mb-4">{option.icon}</div>
              <h3 className="text-xl font-bold text-bestbuy-dark mb-2">
                {option.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {option.description}
              </p>
              <button className="w-full bg-bestbuy-blue text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                {option.action}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-bestbuy-dark mb-2">
                My Best Buy Total™ Members
              </h2>
              <p className="text-gray-600">
                Get 24/7/365 Geek Squad support, priority service, and more
              </p>
            </div>
            <button className="bg-bestbuy-yellow text-bestbuy-dark px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
