
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { ModelParameters } from '@/types/modelParameters';

interface ParameterFormProps {
  form: UseFormReturn<ModelParameters>;
}

export const ParameterForm = ({ form }: ParameterFormProps) => {
  return (
    <div className="space-y-6">
      {/* Number of Steps */}
      <FormField
        control={form.control}
        name="num_steps"
        rules={{
          required: 'Number of steps is required',
          min: { value: 1, message: 'Minimum 1 step' },
          max: { value: 20, message: 'Maximum 20 steps' },
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Number of Steps</FormLabel>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Higher values produce better quality but take longer to process</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input
                type="number"
                min={1}
                max={20}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormDescription>Range: 1-20 (Default: 5)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Guidance Scale */}
      <FormField
        control={form.control}
        name="guidance_scale"
        rules={{
          required: 'Guidance scale is required',
          min: { value: 0.1, message: 'Minimum 0.1' },
          max: { value: 5.0, message: 'Maximum 5.0' },
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Guidance Scale: {field.value}</FormLabel>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Controls how closely the model follows the depth estimation</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Slider
                min={0.1}
                max={5.0}
                step={0.1}
                value={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                className="w-full"
              />
            </FormControl>
            <FormDescription>Range: 0.1-5.0 (Default: 1.0)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Window Size */}
      <FormField
        control={form.control}
        name="window_size"
        rules={{
          required: 'Window size is required',
          min: { value: 32, message: 'Minimum 32' },
          max: { value: 256, message: 'Maximum 256' },
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Window Size</FormLabel>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Size of the processing window for video frames</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input
                type="number"
                min={32}
                max={256}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormDescription>Range: 32-256 (Default: 110)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Overlap */}
      <FormField
        control={form.control}
        name="overlap"
        rules={{
          required: 'Overlap is required',
          min: { value: 0, message: 'Minimum 0%' },
          max: { value: 100, message: 'Maximum 100%' },
        }}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Overlap (%)</FormLabel>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Overlap percentage between processing windows</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input
                type="number"
                min={0}
                max={100}
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value))}
              />
            </FormControl>
            <FormDescription>Range: 0-100% (Default: 25%)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Maximum Resolution */}
      <FormField
        control={form.control}
        name="max_res"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Maximum Resolution</FormLabel>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Maximum resolution for processing. Higher values require more GPU memory</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select resolution" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="512">512px</SelectItem>
                <SelectItem value="768">768px</SelectItem>
                <SelectItem value="1024">1024px</SelectItem>
                <SelectItem value="1280">1280px</SelectItem>
                <SelectItem value="1920">1920px</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>Default: 1024px</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* CPU Offload */}
      <FormField
        control={form.control}
        name="cpu_offload"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <FormLabel className="text-base">CPU Offload</FormLabel>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Process on CPU instead of GPU. Slower but uses less GPU memory</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormDescription>
                Enable to reduce GPU memory usage
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
