'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TopHeader from '@/components/TopHeader';
import { 
  Dumbbell, 
  Activity, 
  Target, 
  ShieldCheck, 
  Truck, 
  Users,
  Settings,
  Award,
  Package,
  Factory,
  Phone,
  BadgeCheck
} from 'lucide-react';

const GymManufacturingAbout = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-white text-gray-800 min-h-screen">
      {/* TopHeader */}
      <TopHeader />
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div>
                <p className="text-blue-600 font-semibold mb-2 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5" />
                  Premium Gym Equipment Supplier
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Build Your Gym with 
                  <span className="text-blue-600"> Professional Equipment</span>
                </h1>
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                Iron Tribe is your trusted partner for high-quality gym equipment. 
                We supply <span className="text-blue-600 font-medium">commercial and home gym equipment</span> 
                that's built to last, with durability and performance at the core of every product.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  View Products
                </button>
                
                <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Request Quote
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-500">Gym Equipments</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-500">Happy Clients</div>
                </div>
                <div className="text-center bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">PAN</div>
                  <div className="text-sm text-gray-500">India Delivery</div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-8 shadow-lg">
                <div className="aspect-square rounded-lg bg-white p-6 flex flex-col items-center justify-center shadow-inner">
                  <div className="text-6xl mb-4">💪</div>
                  <h3 className="text-2xl font-bold text-gray-900">Complete Gym Solutions</h3>
                  <p className="text-gray-600 mt-2">Home & Commercial Equipment</p>
                  <div className="mt-6 flex gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
              Our <span className="text-blue-600">Product Categories</span>
            </h2>
            
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12">
              We supply a wide range of gym equipment for every fitness need, 
              from commercial gyms to home fitness setups.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Strength Training', 
                  icon: <Dumbbell className="w-12 h-12 text-blue-600" />, 
                  items: ['Dumbbells', 'Barbells', 'Power Racks', 'Weight Plates'],
                  color: 'bg-blue-50'
                },
                { 
                  title: 'Cardio Machines', 
                  icon: <Activity className="w-12 h-12 text-blue-600" />, 
                  items: ['Treadmills', 'Exercise Bikes', 'Ellipticals', 'Rowers'],
                  color: 'bg-blue-50'
                },
                { 
                  title: 'Functional Training', 
                  icon: <Target className="w-12 h-12 text-green-600" />, 
                  items: ['Cable Machines', 'Kettlebells', 'Battle Ropes', 'Pull-up Bars'],
                  color: 'bg-green-50'
                },
                { 
                  title: 'Gym Accessories', 
                  icon: <Package className="w-12 h-12 text-orange-600" />, 
                  items: ['Benches', 'Mats', 'Storage', 'Protection Gear'],
                  color: 'bg-orange-50'
                }
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                  <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{category.title}</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose <span className="text-blue-600">Iron Tribe</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                title: 'Commercial Grade Quality', 
                description: 'Our equipment meets commercial gym standards for durability and performance.',
                icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
                features: ['Heavy-Duty Construction', 'Warranty Included', 'Professional Grade']
              },
              { 
                title: 'Wide Product Range', 
                description: 'From cardio machines to strength equipment, we have everything for your gym.',
                icon: <Package className="w-8 h-8 text-blue-600" />,
                features: ['500+ Products', 'Complete Gym Setup', 'Latest Models']
              },
              { 
                title: 'Expert Consultation', 
                description: 'Get free gym layout planning and equipment selection advice.',
                icon: <Users className="w-8 h-8 text-green-600" />,
                features: ['Free Consultation', 'Gym Planning', 'Equipment Guide']
              },
              { 
                title: 'PAN India Delivery', 
                description: 'We deliver to all major cities across India with proper installation support.',
                icon: <Truck className="w-8 h-8 text-orange-600" />,
                features: ['Free Shipping*', 'Installation Support', 'Track Your Order']
              },
              { 
                title: 'Best Price Guarantee', 
                description: 'Competitive pricing without compromising on quality.',
                icon: <Award className="w-8 h-8 text-purple-600" />,
                features: ['Price Match', 'Bulk Discounts', 'No Hidden Costs']
              },
              { 
                title: 'After Sales Support', 
                description: 'Comprehensive warranty and dedicated customer support.',
                icon: <Settings className="w-8 h-8 text-indigo-600" />,
                features: ['1-3 Year Warranty', 'Service Network', 'Quick Response']
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.features.map((item, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Equipment for <span className="text-blue-600">Every Need</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Factory className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Commercial Gyms</h3>
                    <p className="text-gray-600 text-sm">Complete setup for fitness centers</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">Starting at</div>
                    <div className="text-lg font-bold text-blue-600">₹5L</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">Equipment</div>
                    <div className="text-lg font-bold text-blue-600">50+ Items</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Home Gyms</h3>
                    <p className="text-gray-600 text-sm">Space-saving home workout equipment</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">Starting at</div>
                    <div className="text-lg font-bold text-blue-600">₹25K</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-semibold text-gray-900">Popular</div>
                    <div className="text-lg font-bold text-blue-600">Dumbbell Sets</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Most Popular Equipment</h3>
              <div className="space-y-4">
                {[
                  { name: 'Adjustable Dumbbell Set', category: 'Strength', price: '₹8,999', rating: '4.8' },
                  { name: 'Folding Treadmill', category: 'Cardio', price: '₹45,999', rating: '4.7' },
                  { name: 'Power Rack with Lat Pulldown', category: 'Strength', price: '₹1,25,999', rating: '4.9' },
                  { name: 'Exercise Bike', category: 'Cardio', price: '₹32,999', rating: '4.6' }
                ].map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{product.price}</div>
                      <div className="text-xs text-yellow-600">★ {product.rating}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Features */}
      <section className="py-12 md:py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Equipment <span className="text-blue-600">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Heavy-Duty Steel',
                description: 'Commercial grade steel construction for durability',
                icon: '⚡',
                color: 'bg-blue-100'
              },
              {
                title: 'Space Efficient',
                description: 'Folding and compact designs for home use',
                icon: '📏',
                color: 'bg-blue-100'
              },
              {
                title: 'Easy Assembly',
                description: 'Tool-free or minimal assembly requ-blue',
                icon: '🔧',
                color: 'bg-green-100'
              },
              {
                title: 'Modern Design',
                description: 'Sleek aesthetics with ergonomic design',
                icon: '🎯',
                color: 'bg-purple-100'
              },
              {
                title: 'Quiet Operation',
                description: 'Smooth and quiet performance',
                icon: '🔇',
                color: 'bg-orange-100'
              },
              {
                title: 'Digital Displays',
                description: 'LCD displays with workout metrics',
                icon: '📊',
                color: 'bg-indigo-100'
              },
              {
                title: 'Adjustable',
                description: 'Height, weight, and angle adjustments',
                icon: '⚙️',
                color: 'bg-pink-100'
              },
              {
                title: 'Safety Features',
                description: 'Emergency stop and safety locks',
                icon: '🛡️',
                color: 'bg-yellow-100'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow transition-shadow">
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Equip Your <span className="text-yellow-300">Gym?</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Get expert advice on choosing the right equipment for your gym setup. 
            Free consultation and best prices guaranteed!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 font-bold rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now: +91 98765 43210
            </button>
            
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Package className="w-5 h-5" />
              Get Free Catalog
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-100">
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>1-3 Year Warranty</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-5 h-5" />
              <span>Free Shipping*</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5" />
              <span>Best Price Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default GymManufacturingAbout;
