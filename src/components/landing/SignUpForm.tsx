import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  phoneNumber: z.string().min(9, { message: "Phone number must be at least 9 characters." }),
  country: z.string({ required_error: "Please select a country." }),
  farmLocation: z.string().min(3, { message: "Farm location must be at least 3 characters." }),
  primaryCrop: z.string({ required_error: "Please select a primary crop." }),
  acreage: z.string().min(1, { message: "Acreage is required." }),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      country: "",
      farmLocation: "",
      primaryCrop: "",
      acreage: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Success! Welcome to Outgrow. Our team will contact you soon.");
    form.reset();
  }

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-primary md:text-5xl leading-tight">Ready to Start Your <br /> Growing Season?</h2>
            <p className="max-w-[500px] text-muted-foreground md:text-xl">
               Join 4,800+ farmers and get immediate access to premium markets, financing, and real-time farm data.
            </p>
            <div className="flex flex-col gap-6 pt-6 border-t border-muted">
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">✓</div>
                  <span className="text-lg font-medium text-primary-foreground/90 font-serif">Verification in 24 hours</span>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">✓</div>
                  <span className="text-lg font-medium text-primary-foreground/90 font-serif">No upfront membership fees</span>
               </div>
               <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">✓</div>
                  <span className="text-lg font-medium text-primary-foreground/90 font-serif">Immediate market price updates</span>
               </div>
            </div>
          </div>

          <Card className="shadow-2xl border-none p-4 bg-card rounded-[2rem] transform hover:-rotate-1 transition-transform duration-500">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-serif text-primary">Join Outgrow Network</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-muted border-none h-12 rounded-xl focus:ring-2 focus:ring-secondary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 700 000 000" {...field} className="bg-muted border-none h-12 rounded-xl focus:ring-2 focus:ring-secondary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted border-none h-12 rounded-xl focus:ring-2 focus:ring-secondary">
                                <SelectValue placeholder="Select Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card">
                              <SelectItem value="Kenya">Kenya</SelectItem>
                              <SelectItem value="Uganda">Uganda</SelectItem>
                              <SelectItem value="Nigeria">Nigeria</SelectItem>
                              <SelectItem value="Ghana">Ghana</SelectItem>
                              <SelectItem value="Malawi">Malawi</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="farmLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Farm Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Region / County" {...field} className="bg-muted border-none h-12 rounded-xl focus:ring-2 focus:ring-secondary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="primaryCrop"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Crop</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted border-none h-12 rounded-xl focus:ring-2 focus:ring-secondary">
                                <SelectValue placeholder="Select Crop" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card">
                              <SelectItem value="Coffee">Coffee</SelectItem>
                              <SelectItem value="Tea">Tea</SelectItem>
                              <SelectItem value="Maize">Maize</SelectItem>
                              <SelectItem value="Tobacco">Tobacco</SelectItem>
                              <SelectItem value="Cocoa">Cocoa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="acreage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Acreage</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Total Acres" {...field} className="bg-muted border-none h-12 rounded-xl focus:ring-2 focus:ring-secondary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 rounded-xl font-bold text-lg shadow-xl mt-4">
                    Join Outgrow →
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
