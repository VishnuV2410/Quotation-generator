import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SalesInvoiceService } from '../../service/sales_invoice/sales_invoice.service';
import { saveChallanListData, saveDeliveryChallanFormData, saveInvoiceFormData, saveInvoiceListData } from '../../sample/quotation.sample';
import { InvoiceFormDto, InvoiceListDto } from '../../dto/create-quotation.dto';
import { UpdateInvoiceFormDto } from '../../dto/update-quotation.dto';

@ApiTags('sales_invoice/sales-invoice')
@Controller('sales-invoice')
export class SalesInvoiceController {

        constructor(
                    private readonly SalesInvoiceService: SalesInvoiceService,  
                  ) { }
            
              @Get("get-sales-invoice-form-data")
              async getSalesInvoiceFormData(@Query("Invoice_id") Invoice_id:number,@Query("type") type:string):Promise<any>  {
                return await this.SalesInvoiceService.getSalesInvoiceFormData(Invoice_id,type)
              }
    
              @Get("get-sales-invoice-form-history")
              async getSalesInvoiceFormHistory():Promise<any>  {
                return  await this.SalesInvoiceService.getSalesInvoiceFormHistory()
              }
             
                      
        
              @ApiBody({
                schema: {
                  type: 'array'
                },
                examples: {
                  example: {
                    value: saveInvoiceFormData
                  }
                }
            
              })
              @Post("create-sales-invoice-form")
              async createSalesInvoiceForm(@Body() InvoiceForm:InvoiceFormDto) :Promise<any> {
                return this.SalesInvoiceService.createSalesInvoiceForm(InvoiceForm)
              }
        
              @ApiBody({
                schema: {
                  type: 'array'
                },
                examples: {
                  example: {
                    value: saveInvoiceFormData
                  }
                }
            
              })
              @Patch("update-sales-invoice-form/:id")
              async updateSalesInvoiceForm(@Param('id')id :number,@Body() UpdateInvoiceForm:UpdateInvoiceFormDto) {
                return this.SalesInvoiceService.updateSalesInvoiceForm(id,UpdateInvoiceForm)
              }
              
           
             
              @Get("generate-sales-invoice-template")
              async generateSalesInvoiceTemplate(  @Res() res:Response,@Query('id') id :number) {
                return this.SalesInvoiceService.generateSalesInvoiceTemplate(res,id)
              }
             
              @Get("download-sales-invoice-template")
              async downloadSalesInvoiceTemplate( @Query('id') id :number) {
                return this.SalesInvoiceService.downloadSalesInvoiceTemplate(id)
              }
    
              @ApiBody({
                schema: {
                  type: 'array'
                },
                examples: {
                  example: {
                    value: saveInvoiceListData
                  }
                }
            
              })
              @Post("save-or-update-invoice-list")
              async SaveOrUpdateSalesInvoiceList(@Body() data:{doc_number:string,invoice_list:InvoiceListDto[],record_id?:number} ) :Promise<any> {
                return this.SalesInvoiceService.SaveOrUpdateSalesInvoiceList(data.doc_number,data.invoice_list,data.record_id)
              }
    
              @Get("get-all-sales-invoice-list")
              async getAllSalesInvoiceList(@Query('doc_number') doc_number:string):Promise<any> {
                return this.SalesInvoiceService.getAllSalesInvoiceList(doc_number)
              }
        
              
              @Get("delete-sales-invoice-list")
              async deleteSalesInvoiceListItems(@Query('record_id') record_id:number) :Promise<any> {
                return this.SalesInvoiceService.deleteSalesInvoiceListItems(record_id)
              }
    
              @Get("get-single-invoice-list")
              async getSingleSalesInvoiceList(@Query('record_id') record_id:number):Promise<any> {
                return this.SalesInvoiceService.getSingleSalesInvoiceList(record_id)
              }
    
              @Get("reset-temp-sales-invoice-list")
              async resetTempSalesInvoiceData(@Query('doc_number') doc_number:string):Promise<any> {
                return this.SalesInvoiceService.resetTempSalesInvoiceData(doc_number)
              }
              @Get("move-forward-sales-invoice")
              async moveForwardSalesInvoice(@Query('quotation_id') quotation_id:number):Promise<any> {
                return this.SalesInvoiceService.moveForwardSalesInvoice(quotation_id)
              }
    
}
